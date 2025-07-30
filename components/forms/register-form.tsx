"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { signUp } from "@/server/user";

const formSchema = z.object({
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
	username: z
		.string()
		.min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
	email: z.string().email("Email inválido."),
	password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export function RegisterForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		formData.append("name", values.name);
		formData.append("username", values.username);
		formData.append("email", values.email);
		formData.append("password", values.password);

		const result = await signUp(null, formData);

		if (result.errors?.message) {
			form.setError("root.serverError", {
				message: result.errors.message.join(", "),
			});
		} else if (result.redirect) {
			toast.success("Conta criada! Um e-mail de verificação foi enviado.");
			router.push(result.redirect);
		}
	};

	const signInWithGoogle = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "/dashboard",
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md bg-card">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl text-foreground">
						Crie sua conta no Genesis
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Junte-se à nossa comunidade e explore um novo universo de
						possibilidades.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Nome</FormLabel>
										<FormControl>
											<Input
												placeholder="Seu nome completo"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Usuário</FormLabel>
										<FormControl>
											<Input
												placeholder="Seu nome de usuário"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Email</FormLabel>
										<FormControl>
											<Input
												placeholder="seu.email@exemplo.com"
												type="email"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-foreground">Senha</FormLabel>
										<FormControl>
											<Input
												placeholder="Crie uma senha forte"
												type="password"
												{...field}
												className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{form.formState.errors.root?.serverError && (
								<p className="font-medium text-destructive text-sm">
									{form.formState.errors.root.serverError.message}
								</p>
							)}

							<Button
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
								disabled={form.formState.isSubmitting}
								type="submit"
							>
								{form.formState.isSubmitting
									? "Criando conta..."
									: "Criar Conta"}
							</Button>
						</form>
					</Form>

					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-card px-2 text-muted-foreground">
								Ou continue com
							</span>
						</div>
					</div>

					<Button
						className="w-full"
						onClick={signInWithGoogle}
						variant="outline"
					>
						<Image
							alt="Google"
							className="mr-2"
							height={16}
							src="https://www.svgrepo.com/show/353817/google-icon.svg"
							width={16}
						/>
						Cadastrar com Google
					</Button>

					<div className="mt-4 text-center text-sm">
						Já tem uma conta?{" "}
						<Link className="text-primary underline" href="/login">
							Faça login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
