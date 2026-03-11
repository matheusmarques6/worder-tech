"use client";

import { cn } from "@/lib/utils";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useCallback, type KeyboardEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Buscar...",
  value,
  onChange,
  onSubmit,
  className,
}: SearchInputProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <div className={cn("relative", className)}>
      <MagnifyingGlass
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full h-9 pl-9 pr-16 text-sm rounded-[10px] border-transparent",
          "bg-[#F5F5F5] dark:bg-[#2A2A2A]",
          "text-text-primary placeholder:text-text-muted",
          "focus:outline-none focus:ring-1 focus:ring-worder-primary/30 focus:border-transparent",
          "transition-shadow duration-200"
        )}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-[#E0E0E0] dark:bg-[#3A3A3A] rounded px-1.5 py-0.5 text-text-muted pointer-events-none font-medium">
        Cmd+K
      </span>
    </div>
  );
}
