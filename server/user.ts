"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { userSchema } from "@/server/schemas/user-schema";

export const getUserById = async (id: string) => {
	try {
		const currentUser = await prisma.user.findFirst({
			where: { id },
		});
		if (!currentUser) {
			return { success: false, error: "Usuário não encontrado." };
		}
		return {
			success: true,
			data: currentUser,
			message: "Usuário obtido com sucesso.",
		};
	} catch (_error) {
		return { success: false, error: "Ocorreu um erro ao buscar o usuário." };
	}
};

export const getCurrentUser = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const currentUser = await prisma.user.findFirst({
		where: {
			id: session.user.id,
		},
	});

	if (!currentUser) {
		redirect("/login");
	}

	return {
		...session,
		currentUser,
	};
};

export const getUserByEmail = async (email: string) => {
	try {
		const currentUser = await prisma.user.findFirst({
			where: { email },
		});
		if (!currentUser) {
			return { success: false, error: "Usuário não encontrado." };
		}
		return {
			success: true,
			data: currentUser,
			message: "Usuário obtido com sucesso.",
		};
	} catch (_error) {
		return { success: false, error: "Ocorreu um erro ao buscar o usuário." };
	}
};

export const getUserSession = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return { success: false, error: "Usuário não autenticado." };
		}

		const currentUser = await prisma.user.findFirst({
			where: {
				id: session?.user?.id,
			},
		});

		if (!currentUser) {
			return { success: false, error: "Usuário não encontrado." };
		}

		return {
			success: true,
			data: {
				...session,
				user: currentUser,
			},
			message: "Sessão do usuário obtida com sucesso.",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao obter a sessão do usuário.",
		};
	}
};

export const signIn = async (
	_: unknown,
	formData: FormData
): Promise<{
	errors: Record<string, string[]>;
	values: Record<string, string>;
	redirect?: string;
}> => {
	const formValues = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	try {
		await auth.api.signInEmail({
			body: {
				email: formValues.email,
				password: formValues.password,
			},
		});

		return {
			errors: {},
			values: {
				text: "Login realizado com sucesso.",
			},
			redirect: "/dashboard",
		};
	} catch (e: unknown) {
		const error = e as Error;
		return {
			errors: { message: [error.message || "Ocorreu um erro desconhecido."] },
			values: {},
		};
	}
};

export const signUp = async (
	_: unknown,
	formData: FormData
): Promise<{
	errors: Record<string, string[]>;
	values: Record<string, string>;
	redirect?: string;
}> => {
	const formValues = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		name: formData.get("name") as string,
		username: formData.get("username") as string,
	};

	try {
		const { user } = await auth.api.signUpEmail({
			body: {
				email: formValues.email,
				password: formValues.password,
				name: formValues.name,
				username: formValues.username,
			},
		});

		if (!user) {
			return {
				errors: { message: ["Não foi possível criar o usuário."] },
				values: {},
			};
		}

		await auth.api.createOrganization({
			body: {
				name: `${formValues.name}'s Workspace`,
				slug: `${formValues.username.toLowerCase().replace(/\s+/g, "-")}`,
				userId: user.id,
			},
		});

		return {
			errors: {},
			values: {
				text: "Usuário criado com sucesso.",
			},
			redirect: "/dashboard",
		};
	} catch (e) {
		const error = e as Error;
		return {
			errors: { message: [error.message || "Ocorreu um erro desconhecido."] },
			values: {},
		};
	}
};

export const signOut = async () => {
	try {
		await auth.api.signOut({
			headers: await headers(),
		});
		redirect("/login");
	} catch (_error) {
		redirect("/login");
	}
};

export const getUserProfile = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return { success: false, error: "Usuário não autenticado." };
		}

		const userProfile = await prisma.user.findFirst({
			where: {
				id: session?.user?.id,
			},
		});

		if (!userProfile) {
			return { success: false, error: "Perfil do usuário não encontrado." };
		}

		return {
			success: true,
			data: userProfile,
			message: "Perfil do usuário obtido com sucesso.",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao buscar o perfil do usuário.",
		};
	}
};

export const updateProfile = async (data: z.infer<typeof userSchema>) => {
	try {
		const session = await getUserSession();

		if (!(session.success && session.data?.user?.id)) {
			return {
				success: false,
				error: "Usuário não autenticado para atualização.",
			};
		}

		await prisma.user.update({
			where: {
				id: session.data.user.id,
			},
			data,
		});

		return {
			success: true,
			message: "Perfil atualizado com sucesso.",
			redirect: "/dashboard",
		};
	} catch (_error) {
		return {
			success: false,
			error: "Ocorreu um erro ao atualizar o perfil.",
		};
	}
};
