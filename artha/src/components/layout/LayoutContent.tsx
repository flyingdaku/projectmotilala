'use client';

import { Toaster } from "sonner";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          },
        }}
      />
    </>
  );
}
