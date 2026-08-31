'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

const route = 'M-40 742 H188 V626 H392 V690 H612 V504 H812 V548 H1030 V354 H1244 V412 H1468 V236 H1640';

export default function SystemTelemetry() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const routeProgress = useTransform(scrollYProgress, [0, 0.96], [0.04, 1]);
  const leftPacket = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const rightPacket = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

  return (
    <div className="system-telemetry" aria-hidden="true">
      <svg className="system-telemetry-route" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <path className="system-telemetry-route-ghost" d={route} pathLength="1" />
        <motion.path
          className="system-telemetry-route-live"
          d={route}
          pathLength="1"
          style={{ pathLength: reduceMotion ? 1 : routeProgress }}
        />
        <g className="system-telemetry-nodes">
          <circle cx="188" cy="626" r="3" />
          <circle cx="612" cy="504" r="3" />
          <circle cx="1030" cy="354" r="3" />
          <circle cx="1468" cy="236" r="3" />
        </g>
      </svg>

      <div className="system-telemetry-scan" />

      <div className="system-telemetry-rail system-telemetry-rail-left">
        <motion.span className="system-telemetry-packet" style={reduceMotion ? { top: '100%' } : { top: leftPacket }} />
      </div>
      <div className="system-telemetry-rail system-telemetry-rail-right">
        <motion.span className="system-telemetry-packet" style={reduceMotion ? { top: '0%' } : { top: rightPacket }} />
      </div>

      <span className="system-telemetry-coordinate system-telemetry-coordinate-top">SYS / 00.24</span>
      <span className="system-telemetry-coordinate system-telemetry-coordinate-bottom">TRACE / ACTIVE</span>
    </div>
  );
}
