'use client';

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactElement, ReactNode } from 'react';

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Milliseconds between each child. */
  step?: number;
  [key: string]: unknown;
};

/**
 * Lets a list settle in one item at a time when it scrolls into view.
 * Hidden state only applies under `.js-reveal` (set by RevealObserver when
 * motion is allowed), so content is always visible without JS.
 */
export default function Stagger({ as: Tag = 'div', className, children, step = 70, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const count = Children.count(children);
    const id = window.setTimeout(() => setSettled(true), 700 + count * step);
    return () => window.clearTimeout(id);
  }, [inView, children, step]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window) || node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let index = 0;
  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<{ style?: CSSProperties }>;
    const style = { ...(element.props.style ?? {}), '--i': index++ } as CSSProperties;
    return cloneElement(element, { style });
  });

  return (
    <Tag
      ref={ref}
      className={['stagger', inView ? 'is-in' : '', settled ? 'is-settled' : '', className].filter(Boolean).join(' ')}
      style={{ '--stagger-step': `${step}ms` } as CSSProperties}
      {...rest}
    >
      {items}
    </Tag>
  );
}
