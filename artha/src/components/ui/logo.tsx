import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  gradient?: boolean
}

export function Logo({ className, gradient = false, ...props }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient id="artha-amber" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      )}
      
      <circle cx="50" cy="50" r="48" fill="var(--background)" />
      
      <g stroke={gradient ? 'url(#artha-amber)' : 'currentColor'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Core 8-pointed star/chakra arcs */}
        <path d="M50 15 L50 35 M50 65 L50 85" />
        <path d="M15 50 L35 50 M65 50 L85 50" />
        
        <path d="M25 25 L40 40 M60 60 L75 75" />
        <path d="M75 25 L60 40 M40 60 L25 75" />
        
        {/* Inner connecting arcs */}
        <circle cx="50" cy="50" r="18" fill="none" strokeWidth="2" />
        <circle cx="50" cy="50" r="6" fill={gradient ? 'url(#artha-amber)' : 'currentColor'} stroke="none" />
      </g>
    </svg>
  )
}
