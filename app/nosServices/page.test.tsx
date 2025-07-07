import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NosServices from './page';

jest.mock('gsap', () => {
  const playMock = jest.fn();
  const reverseMock = jest.fn();

  return {
    set: jest.fn(),
    timeline: jest.fn(() => ({
      to: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      play: playMock,
      reverse: reverseMock,
    })),
    __playMock: playMock,
    __reverseMock: reverseMock,
  };
});

describe('Page NosServices', () => {
  test('devrait afficher un titre principal "NOS SERVICES"', () => {
    render(<NosServices />);
    const heading = screen.getByRole('heading', { level: 1, name: /nos services/i });
    expect(heading).toBeInTheDocument();
  });

  test('devrait comporter des liens vers les services', () => {
    render(<NosServices />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  
});
