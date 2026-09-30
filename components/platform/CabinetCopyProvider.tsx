"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CabinetCopy } from "@/content/cabinet/types";

const CabinetCopyContext = createContext<CabinetCopy | null>(null);

export function CabinetCopyProvider({
  copy,
  children,
}: {
  copy: CabinetCopy;
  children: ReactNode;
}) {
  return (
    <CabinetCopyContext.Provider value={copy}>{children}</CabinetCopyContext.Provider>
  );
}

export function useCabinetCopy(): CabinetCopy {
  const copy = useContext(CabinetCopyContext);
  if (!copy) {
    throw new Error("useCabinetCopy must be used within CabinetCopyProvider");
  }
  return copy;
}
