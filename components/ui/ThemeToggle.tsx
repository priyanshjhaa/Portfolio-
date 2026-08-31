'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

const storageKey = 'portfolio-theme';
const themeEvent = 'portfolio-theme-change';

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(getCurrentTheme());

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => {
      if (window.localStorage.getItem(storageKey)) return;
      const nextTheme: Theme = media.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
      window.dispatchEvent(new CustomEvent<Theme>(themeEvent, { detail: nextTheme }));
    };

    const syncThemeControls = (event: Event) => setTheme((event as CustomEvent<Theme>).detail);

    media.addEventListener('change', syncSystemTheme);
    window.addEventListener(themeEvent, syncThemeControls);
    return () => {
      media.removeEventListener('change', syncSystemTheme);
      window.removeEventListener(themeEvent, syncThemeControls);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent<Theme>(themeEvent, { detail: nextTheme }));
  };

  const targetTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn('tap-target premium-action inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary hover:text-text-primary', className)}
      aria-label={`Switch to ${targetTheme} theme`}
      title={`Switch to ${targetTheme} theme`}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
