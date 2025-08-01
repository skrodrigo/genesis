import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
