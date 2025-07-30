import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isMounted, setIsMounted] = useState(false);
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>
						Login with your Github or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="flex flex-col gap-4">
								<Button
									className="w-full bg-foreground/90 text-background dark:text-background"
									variant="default"
								>
									{isMounted && (
										<Image
											alt="Logo"
											height={20}
											src={
												resolvedTheme === "light"
													? "/github-white.svg"
													: "/github.svg"
											}
											width={20}
										/>
									)}
									Login with Github
								</Button>
								<Button
									className="w-full bg-foreground/90 text-background dark:text-background"
									variant="default"
								>
									<Image
										alt="Google"
										height={18}
										src="/google.svg"
										width={18}
									/>
									Login with Google
								</Button>
							</div>
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
								<span className="relative z-10 bg-card px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										placeholder="m@example.com"
										required
										type="email"
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											className="ml-auto text-accent-foreground/60 text-sm underline-offset-4 hover:underline"
											href="#"
										>
											Forgot your password?
										</Link>
									</div>
									<Input
										id="password"
										placeholder="••••••••"
										required
										type="password"
									/>
								</div>
								<Button className="w-full" type="submit">
									Login
								</Button>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link
									className="underline underline-offset-4"
									href="/dashboard"
								>
									Sign up
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
