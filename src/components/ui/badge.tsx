import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'coral' | 'mint' | 'lavender' | 'sunshine' | 'outline'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gallery-100 text-gallery-700',
    coral: 'bg-accent-coral/10 text-accent-coral',
    mint: 'bg-accent-mint/10 text-accent-mint',
    lavender: 'bg-accent-lavender/10 text-accent-lavender',
    sunshine: 'bg-accent-sunshine/50 text-gallery-800',
    outline: 'border border-gallery-200 text-gallery-600',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
