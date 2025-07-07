import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outline' | 'glass' | 'hover-lift';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  interactive?: boolean;
}

export function ModernCard({ 
  children, 
  className, 
  variant = 'default',
  size = 'md',
  onClick,
  interactive = false
}: ModernCardProps) {
  const baseClasses = "bg-white rounded-xl transition-all duration-200";
  
  const variants = {
    default: "border border-border shadow-sm hover:shadow-md hover:border-border-strong",
    elevated: "border border-border-strong shadow-lg hover:shadow-xl",
    outline: "border-2 border-border hover:border-primary-300 hover:shadow-sm",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/90 hover:shadow-xl",
    'hover-lift': "border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-border-strong"
  };

  const sizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const interactiveClasses = interactive || onClick ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : "";

  return (
    <div 
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        interactiveClasses,
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
} 