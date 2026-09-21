'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function BookThemeToggle() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('portfolio-theme'); } catch {}
      const next = saved === 'light' || saved === 'dark' ? saved : media.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => { media.removeEventListener('change', sync); window.removeEventListener('storage', sync); };
  }, []);
  return <button className="book-theme" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem('portfolio-theme', next); } catch {}
    setTheme(next);
  }}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>;
}
