'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const storageKey = 'portfolio-theme';

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const followSystem = () => {
      try {
        if (window.localStorage.getItem(storageKey)) return;
      } catch {
        /* storage unavailable: keep following the system */
      }
      const next: Theme = media.matches ? 'dark' : 'light';
      applyTheme(next);
      setTheme(next);
    };

    media.addEventListener('change', followSystem);
    // Stay in sync when something else (like the command palette) switches theme.
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      media.removeEventListener('change', followSystem);
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
