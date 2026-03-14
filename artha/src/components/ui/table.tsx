"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, style, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-xl border"
      style={{ borderColor: "var(--border)", background: "var(--table-row-bg)" }}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        style={style}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b [&_tr]:bg-[var(--table-header-bg)] [&_tr]:text-[var(--text-secondary)]", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0 [&_tr:nth-child(even)]:bg-[var(--table-stripe)] [&_tr:nth-child(odd)]:bg-[var(--table-row-bg)]", className)}
      {...props}
    />
  )
}

function TableFooter({ className, style, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      style={{ background: "var(--table-header-bg)", borderColor: "var(--border)", ...style }}
      {...props}
    />
  )
}

function TableRow({ className, style, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "data-[state=selected]:bg-[var(--brand-tint)] border-b transition-colors hover:bg-[var(--table-hover)]",
        className
      )}
      style={{ borderColor: "var(--border)", ...style }}
      {...props}
    />
  )
}

function TableHead({ className, style, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle text-[11px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      style={{ color: "var(--text-secondary)", ...style }}
      {...props}
    />
  )
}

function TableCell({ className, style, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3 py-[var(--table-row-y)] align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      style={{ color: "var(--text-primary)", ...style }}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
