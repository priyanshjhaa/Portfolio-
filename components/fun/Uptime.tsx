'use client';

import { useEffect, useState } from 'react';

/** Footer status line: a tongue-in-cheek uptime counter for your visit. */
export default function Uptime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const time = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;

  return (
    <span className="uptime">
      <span className="status status--live">All systems operational</span>
      <span className="uptime__time">your visit: {time}</span>
    </span>
  );
}
