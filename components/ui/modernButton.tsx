import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface BaseModernButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

interface ButtonProps extends BaseModernButtonProps {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  target?: never;
  rel?: never;
}

interface LinkProps extends BaseModernButtonProps {
  href: string;
  onClick?: never;
  type?: never;
  target?: string;
  rel?: string;
}

type ModernButtonProps = ButtonProps | LinkProps;

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
  iconPosition = 'left',
  type = 'button',
  target,
  rel,
  ...rest
}: ModernButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600 shadow-sm hover:shadow-md",
    secondary: "bg-white text-secondary-700 border border-border hover:bg-background-subtle hover:border-border-strong focus-visible:outline-primary-600 shadow-sm",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus-visible:outline-primary-600 shadow-sm hover:shadow-md",
    ghost: "text-secondary-700 hover:bg-background-subtle hover:text-secondary-900 focus-visible:outline-primary-600",
    accent: "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 focus-visible:outline-primary-600 shadow-md hover:shadow-lg",
    destructive: "bg-error text-white hover:bg-error/90 focus-visible:outline-error shadow-sm hover:shadow-md"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm rounded-lg",
    md: "h-10 px-4 text-sm rounded-lg",
    lg: "h-12 px-6 text-base rounded-lg min-h-[48px]",
    xl: "h-14 px-8 text-lg rounded-xl min-h-[56px]"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4", 
    lg: "w-5 h-5",
    xl: "w-5 h-5"
  };

  const commonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    disabled && "cursor-not-allowed opacity-50",
    className
  );

  const iconContent = (
    <>
      {loading && (
        <Loader2 className={cn("animate-spin mr-2", iconSizes[size])} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={cn("mr-2 flex items-center", iconSizes[size])}>
          {icon}
        </span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={cn("ml-2 flex items-center", iconSizes[size])}>
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href}
        target={target}
        rel={rel}
        className={commonClasses}
        {...rest}
      >
        {iconContent}
      </a>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={commonClasses}
      {...rest}
    >
      {iconContent}
    </button>
  );
} 