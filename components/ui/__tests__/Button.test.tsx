import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  test('devrait se rendre sans crash avec les props par défaut', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-cyan-500'); // variant primary par défaut
    expect(button).toHaveClass('h-11', 'px-6'); // size md par défaut
  });

  describe('Variants', () => {
    test('devrait appliquer le style primary', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gradient-to-r', 'from-blue-500', 'to-cyan-500');
    });

    test('devrait appliquer le style secondary', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-slate-100', 'text-slate-900');
    });

    test('devrait appliquer le style outline', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-blue-500', 'text-blue-500');
    });

    test('devrait appliquer le style ghost', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-slate-600', 'hover:text-slate-900');
    });
  });

  describe('Sizes', () => {
    test('devrait appliquer la taille sm', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'text-sm');
    });

    test('devrait appliquer la taille md', () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11', 'px-6', 'text-base');
    });

    test('devrait appliquer la taille lg', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12', 'px-8', 'text-lg');
    });

    test('devrait appliquer la taille xl', () => {
      render(<Button size="xl">Extra Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-14', 'px-10', 'text-xl');
    });
  });

  describe('États', () => {
    test('devrait être désactivé quand disabled=true', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });

    test('devrait accepter des classes CSS personnalisées', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Événements', () => {
    test('devrait gérer les clics', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Clickable</Button>);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('ne devrait pas déclencher onClick quand disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('devrait gérer les événements de focus', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Accessibilité', () => {
    test('devrait avoir les classes de focus appropriées', () => {
      render(<Button>Accessible</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });

    test('devrait accepter les attributs aria', () => {
      render(<Button aria-label="Bouton personnalisé">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Bouton personnalisé');
    });

    test('devrait supporter le type submit', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Forward Ref', () => {
    test('devrait forwarder la ref correctement', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe('Ref Button');
    });
  });
}); 