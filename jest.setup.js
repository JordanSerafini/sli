import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configuration de testing-library
configure({ testIdAttribute: 'data-testid' });

// Configuration de l'environnement DOM pour les tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Setup du DOM
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// Mock de l'API IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Configuration DOM pour les tests
if (typeof document !== 'undefined') {
  // Créer un conteneur root par défaut
  const div = document.createElement('div');
  div.setAttribute('id', 'root');
  document.body.appendChild(div);
}

// Mock pour URL.createObjectURL
global.URL.createObjectURL = jest.fn();

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextRequest: class MockNextRequest {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.headers = new Headers(init?.headers);
      this.body = init?.body;
    }
    
    async json() {
      try {
        return JSON.parse(this.body || '{}');
      } catch {
        throw new SyntaxError(`Unexpected token '${this.body?.[0] || 'undefined'}', "${this.body || 'undefined'}" is not valid JSON`);
      }
    }
  },
  NextResponse: {
    json: (data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      ...init
    })
  }
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock Resend globalement pour tous les tests
const mockEmailsSend = jest.fn();

// Créer un mock global pour Resend
global.mockEmailsSend = mockEmailsSend;

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockEmailsSend
    }
  }))
}));

// Mock Request and Response for API tests
global.Request = class MockRequest {
  constructor(input, init) {
    this.url = input;
    this.method = init?.method || 'GET';
    this.headers = new Headers(init?.headers);
    this.body = init?.body;
  }
  
  async json() {
    try {
      return JSON.parse(this.body || '{}');
    } catch {
      throw new SyntaxError(`Unexpected token '${this.body?.[0] || 'undefined'}', "${this.body || 'undefined'}" is not valid JSON`);
    }
  }
};

global.Response = class MockResponse {
  constructor(body, init) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = new Headers(init?.headers);
  }
  
  async json() {
    return JSON.parse(this.body || '{}');
  }
};

// Supprimer la restriction de console.error pour les tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to') &&
      args[0].includes('inside a test was not wrapped in act')
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
}); 