import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoCardProps {
  logoSrc: string;
  logoAlt: string;
  partnerName?: string;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
}

export function LogoCard({ 
  logoSrc,
  logoAlt,
  partnerName,
  className,
  variant = 'default',
  size = 'md',
  interactive = true,
  onClick
}: LogoCardProps) {
  
  const baseClasses = "flex items-center justify-center transition-all duration-300";
  
  const variants = {
    default: "bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg",
    bordered: "bg-white rounded-xl border-2 border-slate-300 hover:border-blue-400 hover:shadow-xl",
    elevated: "bg-white rounded-xl shadow-lg hover:shadow-2xl border border-slate-100",
    minimal: "bg-slate-50 rounded-lg hover:bg-white border border-transparent hover:border-slate-200"
  };

  const sizes = {
    sm: {
      container: "p-4 min-h-[80px]",
      logo: "h-10 max-w-[100px]",
      logoSize: { width: 120, height: 60 }
    },
    md: {
      container: "p-6 min-h-[120px]",
      logo: "h-16 max-w-[140px]",
      logoSize: { width: 180, height: 90 }
    },
    lg: {
      container: "p-8 min-h-[140px]",
      logo: "h-20 max-w-[160px]",
      logoSize: { width: 200, height: 100 }
    },
    xl: {
      container: "p-10 min-h-[160px]",
      logo: "h-24 max-w-[200px]",
      logoSize: { width: 240, height: 120 }
    }
  };

  const interactiveClasses = interactive ? 
    "cursor-pointer group hover:scale-105 active:scale-95" : "";

  const logoHoverClasses = interactive ? 
    "group-hover:brightness-110 group-hover:scale-105" : "";

  return (
    <div 
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size].container,
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
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={sizes[size].logoSize.width}
          height={sizes[size].logoSize.height}
          className={cn(
            sizes[size].logo,
            "w-auto object-contain transition-all duration-300",
            logoHoverClasses
          )}
          style={{
            minWidth: size === 'sm' ? '80px' : size === 'md' ? '100px' : size === 'lg' ? '120px' : '140px'
          }}
        />
        {partnerName && (
          <span className="text-xs font-medium text-slate-600 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {partnerName}
          </span>
        )}
      </div>
    </div>
  );
} 