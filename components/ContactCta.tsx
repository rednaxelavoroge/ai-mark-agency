"use client";

import type { ButtonHTMLAttributes } from "react";
import { openLauncher } from "@/lib/contact";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

/** Primary contact CTA: opens the channel chooser, not the email form. */
export function ContactCta({ children, className, onClick, type, ...rest }: Props) {
  return (
    <button
      type={type ?? "button"}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        openLauncher();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
