'use client';

import { useEffect, useState } from 'react';
import { Command, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Builds', href: '#projects' },
  { name: 'Stats', href: '#about' },
  { name: 'Mission Log', href: '#timeline' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onOpenExplorer: () => void;
}

export default function Navigation({ onOpenExplorer }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const sections = ['#hero', ...navLinks.map((link) => link.href)]
      .map((selector) => document.querySelector(selector))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target instanceof HTMLElement) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.15, 0.3, 0.6],
      }
    );

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

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
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'py-2.5' : 'py-3.5'
      )}
    >
      <div className="mx-auto max-w-[1140px] px-4">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border transition-all duration-300',
            isScrolled
              ? 'border-accent/20 bg-[#090909]/88 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl'
              : 'border-white/5 bg-[#090909]/70 backdrop-blur-md'
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.07] via-transparent to-white/[0.02] pointer-events-none" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent pointer-events-none" />

          <div className="relative flex items-center justify-between px-4 md:px-5">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, '#hero')}
              className="group flex items-center gap-3 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 font-display text-lg font-semibold tracking-[0.16em] text-text-primary transition-colors group-hover:border-accent/40 group-hover:text-accent">
                PJ
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-sm uppercase tracking-[0.28em] text-text-muted">
                  Mission Log
                </p>
                <p className="text-sm text-text-secondary">Execution-focused systems</p>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenExplorer}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-text-secondary transition-all duration-200 hover:border-accent/20 hover:bg-accent/10 hover:text-text-primary"
              >
                Explore
                <span className="inline-flex items-center gap-1 rounded-lg border border-white/6 bg-black/20 px-2 py-1 text-[10px] tracking-[0.16em] text-text-muted">
                  <Command className="h-3 w-3" />
                  K
                </span>
              </button>

              <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    data-active={isActive}
                    className={cn(
                      'nav-pill rounded-xl px-4 py-2.5 font-display text-xs uppercase tracking-[0.22em] transition-all duration-200',
                      isActive
                        ? 'bg-accent/12 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                        : 'text-text-secondary hover:bg-white/[0.03] hover:text-text-primary'
                    )}
                  >
                    {link.name}
                  </a>
                );
              })}
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-text-secondary transition-all duration-200 hover:border-accent/20 hover:bg-accent/10 hover:text-accent"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
          </div>

          <div
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300',
              isMobileMenuOpen ? 'max-h-96 border-t border-white/5' : 'max-h-0'
            )}
          >
            <div className="space-y-1 px-4 pb-4 pt-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenExplorer();
                }}
                className="mb-2 flex w-full items-center justify-between rounded-xl border border-white/6 bg-white/[0.03] px-4 py-3.5 font-display text-sm uppercase tracking-[0.2em] text-text-secondary transition-all duration-200 hover:border-accent/20 hover:text-text-primary"
              >
                <span>Explore</span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-white/6 bg-black/20 px-2 py-1 text-[10px] tracking-[0.16em] text-text-muted">
                  <Command className="h-3 w-3" />
                  K
                </span>
              </button>

              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      'block rounded-xl border px-4 py-3.5 font-display text-sm uppercase tracking-[0.2em] transition-all duration-200',
                      isActive
                        ? 'border-accent/20 bg-accent/10 text-accent'
                        : 'border-transparent bg-white/[0.02] text-text-secondary hover:border-accent/10 hover:text-text-primary'
                    )}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
