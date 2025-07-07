import React from 'react';
import { cn } from '@/lib/utils';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'white' | 'subtle' | 'muted' | 'gradient-primary' | 'gradient-subtle';
  id?: string;
  centered?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    children, 
    containerSize = 'lg', 
    padding = 'md',
    background = 'transparent',
    centered = false,
    id,
    ...props 
  }, ref) => {
    // Espacements optimisés pour réduire l'air vertical excessif
    const paddingClasses = {
      none: "",
      sm: "section-sm", // py-8 md:py-12
      md: "section-md", // py-12 md:py-16 
      lg: "section-lg", // py-16 md:py-20
      xl: "section-xl"  // py-20 md:py-24
    };

    const backgroundClasses = {
      transparent: "",
      white: "bg-white",
      subtle: "bg-background-subtle",
      muted: "bg-background-muted",
      'gradient-primary': "gradient-primary text-white",
      'gradient-subtle': "gradient-subtle"
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[background],
          centered && "text-center",
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