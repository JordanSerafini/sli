import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
  features?: string[];
  onClick?: () => void;
}

export function ServiceCard({ 
  title, 
  description, 
  image, 
  icon, 
  href, 
  external = false,
  className,
  variant = 'default',
  features = [],
  onClick
}: ServiceCardProps) {
  const cardVariants = {
    default: "group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2",
    featured: "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-300",
    compact: "group relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  };

  const CardContent = () => (
    <>
      {/* Image Background ou Icon */}
      {image ? (
        <div className="relative h-48 lg:h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ) : icon ? (
        <div className="h-48 lg:h-56 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="text-6xl text-blue-600 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      ) : null}

      {/* Content */}
      <div className={cn(
        "p-6",
        variant === 'featured' && "p-8",
        variant === 'compact' && "p-4"
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className={cn(
            "font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300",
            variant === 'featured' ? "text-2xl" : "text-xl"
          )}>
            {title}
          </h3>
          
          {href && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300">
                {external ? (
                  <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className={cn(
          "text-slate-600 leading-relaxed mb-4",
          variant === 'compact' ? "text-sm" : "text-base"
        )}>
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.slice(0, variant === 'compact' ? 3 : 5).map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
      </div>
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={cn(cardVariants[variant], className)}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        onClick={onClick}
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <div 
      className={cn(cardVariants[variant], className)}
      onClick={onClick}
    >
      <CardContent />
    </div>
  );
} 