'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { contact } from '@/lib/data';
import CommandPalette from '@/components/site/CommandPalette';
import ThemeSwitch from '@/components/site/ThemeSwitch';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'log', label: 'Evidence' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Site header. On the homepage the links scroll and track the active section;
 * on case-study pages they lead back to the homepage sections.
 */
export default function Navigation({ home = false }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcut, setShortcut] = useState('Ctrl K');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 900 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setShortcut('⌘K');

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        if (!home) return;
        const marker = window.scrollY + window.innerHeight * 0.35;
        let current: string | null = null;
        for (const link of links) {
          const section = document.getElementById(link.id);
          if (section && section.offsetTop <= marker) current = link.id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [home]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="nav" data-scrolled={scrolled || menuOpen} data-menu={menuOpen}>
        <div className="wrap nav__inner">
          <Link href="/" className="nav__brand" aria-label="Priyansh Jha, home">
            Priyansh Jha <span>Product engineer</span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {links.map((link) => (
                <li key={link.id}>
                  <a href={home ? `#${link.id}` : `/#${link.id}`} aria-current={active === link.id ? 'true' : undefined}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <button type="button" className="nav__search" onClick={() => setPaletteOpen(true)} aria-label="Search the portfolio">
              <Search aria-hidden="true" /> Search <span className="kbd">{shortcut}</span>
            </button>
            <button type="button" className="icon-btn nav__search-icon" onClick={() => setPaletteOpen(true)} aria-label="Search the portfolio">
              <Search aria-hidden="true" />
            </button>
            <ThemeSwitch />
            <button
              type="button"
              className="icon-btn nav__menu-btn"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
            <a className="btn btn--primary btn--small nav__cta" href={`mailto:${contact.email}`}>
              Email me
            </a>
          </div>
        </div>

        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!menuOpen}>
          <ul className="wrap">
            {links.map((link, index) => (
              <li key={link.id} style={{ ['--i' as string]: index }}>
                <a href={home ? `#${link.id}` : `/#${link.id}`} onClick={() => setMenuOpen(false)} aria-current={active === link.id ? 'true' : undefined}>
                  <span>0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ ['--i' as string]: links.length }}>
              <a className="btn btn--primary" href={`mailto:${contact.email}`} onClick={() => setMenuOpen(false)}>
                Email me
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
