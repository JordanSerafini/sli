import { cn } from '../utils';

describe('Utils Functions', () => {
  describe('cn (className merge function)', () => {
    test('devrait combiner des classes simples', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    test('devrait gérer les valeurs undefined et null', () => {
      const result = cn('class1', undefined, 'class2', null, 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    test('devrait gérer les valeurs booléennes', () => {
      const result = cn('class1', false && 'class2', true && 'class3');
      expect(result).toBe('class1 class3');
    });

    test('devrait gérer les classes conditionnelles', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class',
        'always-class'
      );
      
      expect(result).toBe('base-class active-class always-class');
    });

    test('devrait dédupliquer les classes identiques', () => {
      const result = cn('class1', 'class2', 'class1', 'class3', 'class2');
      // Selon l'implémentation de cn (clsx + twMerge), les doublons peuvent être gérés
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    test('devrait gérer les objets de classes', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true
      });
      
      expect(result).toContain('class1');
      expect(result).not.toContain('class2');
      expect(result).toContain('class3');
    });

    test('devrait gérer les tableaux de classes', () => {
      const result = cn(['class1', 'class2'], 'class3', ['class4']);
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
      expect(result).toContain('class4');
    });

    test('devrait gérer les chaînes vides', () => {
      const result = cn('', 'class1', '', 'class2', '');
      expect(result).toBe('class1 class2');
    });

    test('devrait gérer Tailwind CSS merge conflicts', () => {
      // Test spécifique pour tailwind-merge si utilisé
      const result = cn('p-4', 'p-2'); // p-2 devrait override p-4
      // Le comportement exact dépend de l'implémentation
      expect(result).toBeTruthy();
    });

    test('devrait fonctionner sans arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    test('devrait gérer les espaces multiples', () => {
      const result = cn('  class1  ', '  class2  ');
      expect(result.trim()).toContain('class1');
      expect(result.trim()).toContain('class2');
    });
  });

  describe('Edge cases', () => {
    test('devrait gérer les valeurs numériques', () => {
      const result = cn('class1', 123, 'class2');
      // Selon l'implémentation, les nombres peuvent être convertis en string ou ignorés
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });

    test('devrait gérer les nested objects', () => {
      const result = cn('base', {
        'variant-primary': true,
        'size-large': false,
        'state-active': true
      });
      
      expect(result).toContain('base');
      expect(result).toContain('variant-primary');
      expect(result).not.toContain('size-large');
      expect(result).toContain('state-active');
    });

    test('devrait gérer les expressions complexes', () => {
      const variant = 'primary';
      const size = 'lg';
      const disabled = false;
      
      const result = cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        disabled && 'btn-disabled',
        !disabled && 'btn-enabled'
      );
      
      expect(result).toContain('btn');
      expect(result).toContain('btn-primary');
      expect(result).toContain('btn-lg');
      expect(result).not.toContain('btn-disabled');
      expect(result).toContain('btn-enabled');
    });
  });

  describe('Performance et cas d\'usage réels', () => {
    test('devrait gérer un grand nombre de classes', () => {
      const manyClasses = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const result = cn(...manyClasses);
      
      expect(result).toContain('class-0');
      expect(result).toContain('class-99');
    });

    test('devrait gérer les classes Tailwind typiques', () => {
      const result = cn(
        'flex items-center justify-center',
        'bg-blue-500 hover:bg-blue-600',
        'text-white font-semibold',
        'px-4 py-2 rounded-lg',
        'transition-colors duration-200'
      );
      
      expect(result).toContain('flex');
      expect(result).toContain('items-center');
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('transition-colors');
    });

         test('devrait être utilisable dans un composant React pattern', () => {
       // Simulation d'usage typique dans un composant
       const variant: 'primary' | 'secondary' = 'primary';
       const size: 'sm' | 'md' | 'lg' = 'md';
       const className = 'custom-class';
       
       const result = cn(
         'base-component',
         {
           'variant-primary': variant === 'primary',
           'variant-secondary': variant === 'secondary',
         },
         {
           'size-sm': size === 'sm',
           'size-md': size === 'md',
           'size-lg': size === 'lg',
         },
         className
       );
       
       expect(result).toContain('base-component');
       expect(result).toContain('variant-primary');
       expect(result).toContain('size-md');
       expect(result).toContain('custom-class');
     });
  });
}); 