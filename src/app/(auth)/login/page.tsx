"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnvelopeSimple, Lock, Eye } from "@phosphor-icons/react";

export default function LoginPage() {
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
        Bem-vindo de volta
      </h2>
      <p className="text-sm text-text-muted mb-8">
        Entre na sua conta para acessar o Worder CRM
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            E-mail
          </label>
          <div className="relative">
            <EnvelopeSimple
              size={20}
              weight="duotone"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
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
            <Lock
              size={20}
              weight="duotone"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 border border-border bg-background-card text-text-primary text-sm placeholder:text-text-muted transition-colors duration-200"
              style={{ borderRadius: "var(--radius-input)" }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              <Eye size={20} weight="duotone" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border text-worder-primary accent-worder-primary"
            />
            <span className="text-sm text-text-secondary">Lembrar de mim</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-worder-primary font-medium hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Link href="/dashboard">
          <Button className="w-full mt-2" size="lg">
            Entrar
          </Button>
        </Link>
      </form>

      <p className="text-sm text-text-muted text-center mt-6">
        Não tem uma conta?{" "}
        <Link
          href="/signup"
          className="text-worder-primary font-medium hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}
