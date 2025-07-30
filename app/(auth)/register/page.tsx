import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-sm">
				<RegisterForm />
			</div>
		</div>
	);
}
