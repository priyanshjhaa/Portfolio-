'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ArchitectureStage } from '@/types/project';

/** Step-through view of a project's architecture, built as an accessible tab list. */
export default function ArchitectureFlow({ stages, projectId }: { stages: ArchitectureStage[]; projectId: string }) {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[index];

  const select = (next: number, focus = false) => {
    const bounded = (next + stages.length) % stages.length;
    setIndex(bounded);
    if (focus) tabRefs.current[bounded]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      select(index + 1, true);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      select(index - 1, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      select(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      select(stages.length - 1, true);
    }
  };

  if (!stage) return null;
  const panelId = `${projectId}-flow-panel`;

  return (
    <div className="flow">
      <div className="flow__steps" role="tablist" aria-label="Architecture stages">
        {stages.map((item, itemIndex) => (
          <button
            key={item.label}
            ref={(element) => {
              tabRefs.current[itemIndex] = element;
            }}
            type="button"
            role="tab"
            id={`${projectId}-flow-tab-${itemIndex}`}
            aria-selected={itemIndex === index}
            aria-controls={panelId}
            tabIndex={itemIndex === index ? 0 : -1}
            className="flow__step"
            onClick={() => select(itemIndex)}
            onKeyDown={onKeyDown}
          >
            <b>{itemIndex + 1}</b>
            {item.label}
          </button>
        ))}
      </div>

      <div className="flow__panel" role="tabpanel" id={panelId} aria-labelledby={`${projectId}-flow-tab-${index}`}>
        <div>
          <h3>{stage.label}</h3>
          <p style={{ marginTop: 10 }}>{stage.description}</p>
        </div>
        <div className="flow__guard">
          <span>Safeguard</span>
          <p>{stage.safeguard}</p>
        </div>
        <div className="flow__nav">
          <button type="button" className="btn btn--small" onClick={() => select(index - 1)} aria-label="Previous stage">
            <ArrowLeft aria-hidden="true" /> Previous
          </button>
          <span className="muted" style={{ alignSelf: 'center', fontSize: 13 }}>
            {index + 1} of {stages.length}
          </span>
          <button type="button" className="btn btn--small" onClick={() => select(index + 1)} aria-label="Next stage">
            Next <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
