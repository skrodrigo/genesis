import { ChatInput } from "@/components/chat-input";

export function HeroSection() {
  return (
    <section className="container h-screen mx-auto flex flex-col items-center justify-center text-center -mt-20 px-4 md:px-8 gap-10">
      <div className="max-w-4xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-sans">
          Build products <span className="text-primary">faster</span> with
          AI-powered code generation
        </h1>
      </div>
      <ChatInput />
    </section>
  );
}
