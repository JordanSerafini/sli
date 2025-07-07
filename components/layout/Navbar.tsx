"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/logiciels', label: 'Nos logiciels EBP / Formations' },
    {
      label: 'Nos Services',
      href: '/nosServices',
      dropdown: [
        { href: '/informatique', label: 'Informatique' },
        { href: '/telecom', label: 'Télécom' },
        { href: '/securite', label: 'Sécurité' }
      ]
    },
    { href: '/telemaintenance', label: 'Télémaintenance', highlight: true },
    { href: '/contact', label: 'Contactez-nous' }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-slate-200" 
        : "bg-white"
    )}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
            <Image
              alt="Solution Logique Informatique"
              src="/assets/logo.webp"
              width={180}
              height={60}
              priority
              className="h-auto w-auto max-h-12 lg:max-h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 rounded-lg transition-colors hover:text-blue-600 hover:bg-slate-50"
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                    
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      item.highlight
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      item.highlight
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar; 