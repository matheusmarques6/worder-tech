"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PAGE_TITLES } from "@/lib/constants";

export function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const info = PAGE_TITLES[pathname];
    const title = info?.title
      ? `${info.title} | Worder`
      : "Worder — CRM Inteligente para E-commerce";
    document.title = title;
  }, [pathname]);

  return null;
}
