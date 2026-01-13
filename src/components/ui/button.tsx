'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, asChild = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-gallery-900 text-white hover:bg-gallery-800 hover:shadow-soft rounded-full',
      secondary: 'bg-white text-gallery-900 border border-gallery-200 hover:bg-gallery-50 hover:border-gallery-300 rounded-full',
      accent: 'bg-gradient-to-r from-accent-coral to-accent-blush text-white hover:shadow-glow-coral rounded-full',
      ghost: 'text-gallery-700 hover:bg-gallery-100 hover:text-gallery-900 rounded-lg',
      link: 'text-gallery-700 hover:text-gallery-900 underline-offset-4 hover:underline p-0',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      variant !== 'link' && sizes[size],
      className
    )

    // When asChild is true, clone the child element and merge props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<unknown> }>, {
        className: cn(combinedClassName, (children as React.ReactElement<{ className?: string }>).props.className),
        ref,
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
