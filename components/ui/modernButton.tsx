import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function ModernButton({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  href,
  icon,
  iconPosition = 'left'
}: ModernButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Component 
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </Component>
  );
} 