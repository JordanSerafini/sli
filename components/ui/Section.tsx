import React from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'white' | 'gray' | 'gradient';
  id?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    children, 
    containerSize = 'lg', 
    padding = 'lg',
    background = 'transparent',
    id,
    ...props 
  }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "py-8",
      md: "py-12", 
      lg: "py-16",
      xl: "py-24"
    };

    const backgroundClasses = {
      transparent: "",
      white: "bg-white",
      gray: "bg-slate-50",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500"
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section; 