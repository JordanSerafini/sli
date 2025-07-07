import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'hover-lift';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function ModernCard({ 
  children, 
  className, 
  variant = 'default',
  size = 'md',
  onClick 
}: ModernCardProps) {
  const baseClasses = "rounded-2xl transition-all duration-300";
  
  const variants = {
    default: "bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300",
    gradient: "bg-gradient-to-br from-white to-slate-50 border border-slate-200/50 shadow-lg hover:shadow-xl",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/90",
    'hover-lift': "bg-white border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transform"
  };

  const sizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 