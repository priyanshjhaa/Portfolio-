'use client';

import { useEffect, useState } from 'react';
import { Command, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';
import NavbarRunnerProgress from '@/components/ui/NavbarRunnerProgress';
import { AnimatePresence } from '@/components/ui/LabMotion';

const navLinks = [
  { name: 'Skills', href: '#skills' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#work' },
  { name: 'Evidence', href: '#evidence' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  activeSection: string;
  onOpenExplorer: () => void;
}

export default function Navigation({ activeSection, onOpenExplorer }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [runnerDocked, setRunnerDocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
      const origin = document.querySelector('[data-runner-origin]');
      setRunnerDocked(origin ? origin.getBoundingClientRect().bottom < 104 : activeSection !== '#intro');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav
        className={cn(
          'pointer-events-auto mx-auto flex max-w-[1240px] items-center justify-between transition-[background-color,border-color,box-shadow,padding] duration-500 ease-[var(--ease-premium)]',
          isScrolled
            ? 'premium-surface rounded-full border border-white/10 px-4 py-2.5 md:px-5'
            : 'border-b border-white/8 px-1 pb-4 pt-1'
        )}
      >
        <a href="#intro" onClick={(event) => scrollTo(event, '#intro')} className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] font-editorial text-lg text-text-primary transition-colors group-hover:border-[#b7c6aa]/45">
            P
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-medium text-text-primary">Priyansh Jha</span>
            <span className="block font-display text-[9px] uppercase tracking-[0.18em] text-text-muted">
              Product lab / online
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollTo(event, link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
              className={cn(
                'premium-action mx-0.5 inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm',
                activeSection === link.href ? 'bg-white/[0.07] text-text-primary' : 'text-text-muted hover:text-text-primary'
              )}
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenExplorer}
            className="premium-action ml-2 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-text-secondary hover:border-[#b7c6aa]/35 hover:text-text-primary"
          >
            Explore
            <span className="inline-flex items-center gap-1 font-display text-[9px] text-text-muted">
              <Command className="h-3 w-3" /> K
            </span>
          </button>
          <ThemeToggle className="ml-1" />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="tap-target premium-action inline-flex items-center justify-center rounded-full border border-white/10 text-text-secondary md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {runnerDocked && (
          <div className="pointer-events-none mx-auto max-w-[1240px] px-3 md:px-5">
            <NavbarRunnerProgress activeSection={activeSection} />
          </div>
        )}
      </AnimatePresence>

      <div
        id="mobile-navigation"
        className={cn(
          'premium-surface pointer-events-auto mx-auto mt-2 max-w-[1240px] origin-top transform-gpu rounded-3xl border border-white/10 transition-[opacity,transform,border-color] duration-300 ease-[var(--ease-premium)] md:hidden',
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-[0.98] border-transparent opacity-0'
        )}
        aria-hidden={!isOpen}
      >
        <div className="space-y-1 p-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollTo(event, link.href)}
              className="premium-action flex min-h-11 items-center rounded-2xl px-4 py-3 text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary"
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
            className="premium-action flex min-h-11 w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-text-secondary hover:bg-white/[0.04]"
          >
            Explore builds <Command className="h-4 w-4" />
          </button>
          <div className="flex min-h-11 items-center justify-between rounded-2xl px-4 py-2 text-sm text-text-secondary">
            <span>Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
