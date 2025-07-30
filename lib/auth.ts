import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization, username } from "better-auth/plugins";
import ResetPasswordEmail from "@/components/emails/reset-password";
import VerifyEmail from "@/components/emails/verify-email";
import { ac, admin, member, owner } from "@/lib/permissions";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { stripeClient } from "@/lib/stripe";
import { getActiveOrganization } from "@/server/organizations";

export const auth = betterAuth({
	plugins: [
		nextCookies(),
		organization({
			ac,
			roles: {
				owner,
				admin,
				member,
			},
		}),

		username(),

		stripe({
			stripeClient,
			stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [
					{
						id: "launch",
						name: "Launch",
						price: 49,
						priceId: "",
						interval: "month",
					},
					{
						id: "scale",
						name: "Scale",
						price: 149,
						priceId: "",
						interval: "month",
					},
				],
				getCheckoutSessionParams: () => {
					return {
						params: {
							allow_promotion_codes: true,
						},
					};
				},
			},
		}),
	],

	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			await resend.emails.send({
				from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
				to: user.email,
				subject: "Redefinir sua Senha",
				react: ResetPasswordEmail({
					username: user.name,
					resetUrl: url,
					userEmail: user.email,
				}),
			});
		},
		requireEmailVerification: true,
	},

	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			await resend.emails.send({
				from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
				to: user.email,
				subject: "Verifique seu email",
				react: VerifyEmail({ username: user.name, verifyUrl: url }),
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
	},

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	databaseHooks: {
		session: {
			create: {
				before: async (session) => {
					const organizationData = await getActiveOrganization(session.userId);
					return {
						data: {
							...session,
							activeOrganizationId: organizationData?.data?.id,
						},
					};
				},
			},
		},
	},

	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
});
