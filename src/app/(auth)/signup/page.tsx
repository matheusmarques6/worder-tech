"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnvelopeSimple, Lock, User, Storefront } from "@phosphor-icons/react";

export default function SignupPage() {
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
        Criar conta
      </h2>
      <p className="text-sm text-text-muted mb-8">
        Comece a usar o Worder CRM gratuitamente
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Nome completo
          </label>
          <div className="relative">
            <User size={20} weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-background-card text-text-primary text-sm placeholder:text-text-muted transition-colors duration-200"
              style={{ borderRadius: "var(--radius-input)" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Nome da loja
          </label>
          <div className="relative">
            <Storefront size={20} weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Minha Loja"
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-background-card text-text-primary text-sm placeholder:text-text-muted transition-colors duration-200"
              style={{ borderRadius: "var(--radius-input)" }}
            />
          </div>
        </div>

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

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Senha
          </label>
          <div className="relative">
            <Lock size={20} weight="duotone" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-background-card text-text-primary text-sm placeholder:text-text-muted transition-colors duration-200"
              style={{ borderRadius: "var(--radius-input)" }}
            />
          </div>
        </div>

        <Link href="/onboarding">
          <Button className="w-full mt-2" size="lg">
            Criar conta
          </Button>
        </Link>
      </form>

      <p className="text-sm text-text-muted text-center mt-6">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-worder-primary font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
