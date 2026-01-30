'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Builds', href: '#projects' },
    { name: 'Stats', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 border-b border-[#1a1a1a]',
        isScrolled
          ? 'bg-gta/95 backdrop-blur-md py-3 shadow-lg shadow-black/20'
          : 'bg-gta/85 backdrop-blur-sm py-4'
      )}
    >
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="relative text-xl font-bold text-text-primary hover:text-accent transition-colors duration-200 group"
          >
            P<span className="text-accent">.</span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/0 group-hover:bg-accent/50 transition-colors rounded-full" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative text-text-secondary hover:text-accent transition-colors duration-200 text-xs font-bold uppercase tracking-wider py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-accent/0 hover:bg-accent/40 transition-colors rounded-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-48 border-b border-[#1a1a1a] bg-gta/95 backdrop-blur-md' : 'max-h-0'
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-text-secondary hover:text-accent hover:bg-accent/5 block px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
