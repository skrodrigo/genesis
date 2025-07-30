import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export default function ResetPasswordPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-sm">
				<Suspense fallback={null}>
					<ResetPasswordForm />
				</Suspense>
			</div>
		</div>
	);
}
