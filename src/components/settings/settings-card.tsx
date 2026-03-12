"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

interface SettingsCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void;
  showSave?: boolean;
}

export function SettingsCard({ title, description, children, onSave, showSave = true }: SettingsCardProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#E0E0E0] p-6"
      style={{ borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-5">
        <h3 className="text-[15px] font-bold text-text-primary font-heading">{title}</h3>
        {description && <p className="text-[12px] text-text-muted mt-0.5">{description}</p>}
      </div>

      <div className="space-y-4">{children}</div>

      {showSave && (
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F0F0F0]">
          <button
            onClick={handleSave}
            className="px-5 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
            style={{
              borderRadius: "8px",
              background: "linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)",
              boxShadow: "0 2px 6px rgba(242,107,42,0.25)",
            }}
          >
            Salvar
          </button>

          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[12px] text-success font-medium"
              >
                <CheckCircle size={16} weight="fill" /> Salvo com sucesso
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// Shared input field
interface FieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function SettingsField({ label, value, placeholder, type = "text", disabled, onChange }: FieldProps) {
  return (
    <div>
      <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors disabled:bg-[#FAFAFA] disabled:text-text-muted"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
}

// Shared select field
interface SelectFieldProps {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export function SettingsSelect({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="text-[12px] font-semibold text-text-secondary uppercase tracking-wide">{label}</label>
      <select
        defaultValue={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full mt-1.5 px-4 py-2.5 text-sm border border-[#E0E0E0] bg-white outline-none focus:border-worder-primary transition-colors appearance-none cursor-pointer"
        style={{ borderRadius: "10px" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// Toggle switch
interface ToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}

export function SettingsToggle({ label, description, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-[13px] font-medium text-text-primary">{label}</p>
        {description && <p className="text-[11px] text-text-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
        style={{ background: enabled ? "linear-gradient(90deg, #F26B2A, #F5A623)" : "#DDD" }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
          style={{ left: enabled ? "22px" : "2px" }}
        />
      </button>
    </div>
  );
}
