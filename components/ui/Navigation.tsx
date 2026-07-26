'use client';

import { useEffect, useState } from 'react';
import { Command, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Work', href: '#projects' },
  { name: 'Trace', href: '#trace' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  activeSection: string;
  onOpenExplorer: () => void;
}

export default function Navigation({ activeSection, onOpenExplorer }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav
        className={cn(
          'pointer-events-auto mx-auto flex max-w-[1240px] items-center justify-between transition-all duration-500',
          isScrolled
            ? 'rounded-full border border-white/10 bg-[#111210]/86 px-4 py-2.5 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.9)] backdrop-blur-xl md:px-5'
            : 'border-b border-white/8 px-1 pb-4 pt-1'
        )}
      >
        <a href="#hero" onClick={(event) => scrollTo(event, '#hero')} className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] font-editorial text-lg text-text-primary transition-colors group-hover:border-[#b7c6aa]/45">
            P
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-medium text-text-primary">Priyansh Jha</span>
            <span className="block font-display text-[9px] uppercase tracking-[0.18em] text-text-muted">
              Product engineer
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollTo(event, link.href)}
              className={cn(
                'rounded-full px-4 py-2 text-sm transition-colors',
                activeSection === link.href ? 'bg-white/[0.07] text-text-primary' : 'text-text-muted hover:text-text-primary'
              )}
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenExplorer}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-text-secondary transition-colors hover:border-[#b7c6aa]/35 hover:text-text-primary"
          >
            Explore
            <span className="inline-flex items-center gap-1 font-display text-[9px] text-text-muted">
              <Command className="h-3 w-3" /> K
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="rounded-full border border-white/10 p-2.5 text-text-secondary md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <div
        className={cn(
          'pointer-events-auto mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-3xl border border-white/10 bg-[#111210]/96 backdrop-blur-xl transition-all duration-300 md:hidden',
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 border-transparent opacity-0'
        )}
      >
        <div className="space-y-1 p-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollTo(event, link.href)}
              className="block rounded-2xl px-4 py-3 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenExplorer();
            }}
            className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-text-secondary hover:bg-white/[0.04]"
          >
            Explore builds <Command className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
