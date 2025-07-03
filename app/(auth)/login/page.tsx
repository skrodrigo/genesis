"use client"

import { LoginForm } from "@/components/login-form"
import Image from "next/image"

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="text-primary-foreground flex items-center justify-center rounded-lg">
            {isMounted && (
              <Image
                alt="Logo"
                width={40}
                height={40}
                src="/logo.svg"
              />
            )}
          </div>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
