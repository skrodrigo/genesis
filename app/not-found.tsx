import { Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			<Frown className="size-12 text-secondary" />
			<h1 className="flex items-center justify-center">
				Essa página ainda não existe.
			</h1>
			<Link className="mt-6" href="/lp">
				<Button>Voltar</Button>
			</Link>
		</div>
	);
}
