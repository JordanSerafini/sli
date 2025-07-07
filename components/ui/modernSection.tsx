import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModernSectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient' | 'dark' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  centered?: boolean;
  id?: string;
}

export function ModernSection({ 
  children, 
  className, 
  background = 'white',
  padding = 'lg',
  maxWidth = '7xl',
  centered = true,
  id
}: ModernSectionProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    gradient: "bg-gradient-to-br from-slate-50 via-white to-blue-50/30",
    dark: "bg-slate-900 text-white",
    transparent: "bg-transparent"
  };

  const paddings = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16 lg:py-20",
    xl: "py-20 lg:py-24",
    '2xl': "py-24 lg:py-32"
  };

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    '2xl': "max-w-2xl",
    '4xl': "max-w-4xl",
    '6xl': "max-w-6xl",
    '7xl': "max-w-7xl",
    full: "max-w-none"
  };

  return (
    <section 
      id={id}
      className={cn(
        backgrounds[background],
        paddings[padding],
        className
      )}
    >
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        maxWidths[maxWidth],
        centered && "text-center"
      )}>
        {children}
      </div>
    </section>
  );
} 