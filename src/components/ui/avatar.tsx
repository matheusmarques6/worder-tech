"use client";

import { cn } from "@/lib/utils";
import { User } from "@phosphor-icons/react";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-8 w-8", text: "text-xs", icon: 16 },
  md: { container: "h-10 w-10", text: "text-sm", icon: 20 },
  lg: { container: "h-14 w-14", text: "text-lg", icon: 28 },
} as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const s = sizeMap[size];

  if (src) {
    return (
      <div
        className={cn(
          "rounded-full overflow-hidden shrink-0",
          s.container,
          className
        )}
      >
        <img
          src={src}
          alt={name || "Avatar"}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (name) {
    return (
      <div
        className={cn(
          "rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-semibold",
          s.container,
          s.text,
          className
        )}
        style={{
          background: "linear-gradient(135deg, #F26B2A, #F5A623)",
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-border text-text-muted dark:bg-[#2A2A2A]",
        s.container,
        className
      )}
    >
      <User size={s.icon} weight="fill" />
    </div>
  );
}

export { Avatar };
