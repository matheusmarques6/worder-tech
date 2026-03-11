"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnvelopeSimple, ArrowLeft } from "@phosphor-icons/react";

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="lg:hidden mb-8 text-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl font-heading mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #F26B2A, #F5A623)" }}
        >
          W
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-primary font-heading mb-2">
        Recuperar senha
      </h2>
      <p className="text-sm text-text-muted mb-8">
        Enviaremos um link para redefinir sua senha
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            E-mail
          </label>
          <div className="relative">
            <EnvelopeSimple size={20} weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-background-card text-text-primary text-sm placeholder:text-text-muted transition-colors duration-200"
              style={{ borderRadius: "var(--radius-input)" }}
            />
          </div>
        </div>

        <Button className="w-full" size="lg">
          Enviar link
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center gap-2 justify-center text-sm text-text-muted hover:text-text-primary transition-colors mt-6"
      >
        <ArrowLeft size={16} weight="bold" />
        Voltar para o login
      </Link>
    </div>
  );
}
