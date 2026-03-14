import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  gradient?: boolean
}

export function Logo({ className, gradient = false, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient id="artha-signal" x1="12" y1="12" x2="84" y2="84">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
        </defs>
      )}

      <rect x="8" y="8" width="80" height="80" rx="24" fill="currentColor" opacity="0.12" />

      <g
        stroke={gradient ? "url(#artha-signal)" : "currentColor"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 59C24 59 26 42 32 42C37 42 38 51 44 51C50 51 50 29 58 29C65 29 64 44 72 44" />
        <path d="M20 68L74 68" opacity="0.28" />
        <path d="M62 22L74 22L74 34" />
        <path d="M58 38L74 22" />
      </g>

      <g fill={gradient ? "url(#artha-signal)" : "currentColor"}>
        <circle cx="32" cy="42" r="3.25" />
        <circle cx="44" cy="51" r="3.25" />
        <circle cx="58" cy="29" r="3.25" />
        <circle cx="72" cy="44" r="3.25" />
      </g>
    </svg>
  )
}
