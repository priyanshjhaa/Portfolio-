/* eslint-disable @next/next/no-img-element -- Satori renders plain <img>, not next/image. */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

const c = {
  bg: '#131210',
  plate: '#1b1a17',
  ink: '#ece8df',
  ink2: '#b6b0a5',
  ink3: '#8c867b',
  line: 'rgba(236, 232, 223, 0.12)',
  accent: '#e08463',
};

interface ShareCardOptions {
  eyebrow: string;
  title: string;
  summary: string;
  chips?: string[];
  /** Path under /public, e.g. /projects/sprout/landing.jpg */
  image?: string;
  /** width / height of the screenshot. */
  imageAspect?: number;
  /** JPEG under /public for a portrait shown instead of a screenshot. */
  portrait?: string;
}

async function publicDataUrl(publicPath: string, mime: string) {
  const file = await readFile(path.join(process.cwd(), 'public', publicPath));
  return `data:${mime};base64,${file.toString('base64')}`;
}

/** Branded 1200×630 share card, rendered at build time for each page. */
export async function shareCard({ eyebrow, title, summary, chips = [], image, imageAspect = 1.9, portrait }: ShareCardOptions) {
  const shot = image ? await publicDataUrl(image, 'image/jpeg') : null;
  const face = portrait ? await publicDataUrl(portrait, 'image/jpeg') : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: c.bg,
          backgroundImage: `radial-gradient(circle at 12% 0%, rgba(224,132,99,0.18), transparent 46%), radial-gradient(circle at 100% 100%, rgba(236,232,223,0.06), transparent 50%)`,
          color: c.ink,
          padding: 44,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            borderRadius: 28,
            border: `1px solid ${c.line}`,
            background: 'rgba(27, 26, 23, 0.72)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '48px 52px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, color: c.ink3, letterSpacing: 2, textTransform: 'uppercase' }}>
                <div style={{ width: 10, height: 10, borderRadius: 999, background: c.accent }} />
                {eyebrow}
              </div>
              <div style={{ display: 'flex', fontSize: title.length > 18 ? 64 : 84, lineHeight: 1.04, marginTop: 26, letterSpacing: -2 }}>{title}</div>
              <div style={{ display: 'flex', fontSize: 27, lineHeight: 1.4, color: c.ink2, marginTop: 22, maxWidth: shot || face ? 560 : 900 }}>{summary}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: shot || face ? 560 : 820 }}>
                {chips.slice(0, 4).map((chip) => (
                  <div key={chip} style={{ display: 'flex', fontSize: 19, color: c.ink2, padding: '7px 14px', borderRadius: 999, border: `1px solid ${c.line}`, background: c.bg }}>
                    {chip}
                  </div>
                ))}
              </div>
              {!shot && !face && <div style={{ display: 'flex', fontSize: 22, color: c.ink3 }}>Priyansh Jha · Product engineer</div>}
            </div>
          </div>

          {(shot || face) && (
            <div style={{ width: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1px solid ${c.line}`, background: c.plate, position: 'relative' }}>
              {shot ? (
                // Bleeds off the right edge like a window peeking in; sized to the real aspect so nothing is cropped on the left.
                <img
                  alt=""
                  src={shot}
                  width={560}
                  height={Math.round(560 / imageAspect)}
                  style={{ position: 'absolute', left: 48, top: 150, borderRadius: 16, border: `1px solid ${c.line}`, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
                />
              ) : (
                <img alt="" src={face!} width={300} height={400} style={{ borderRadius: 22, objectFit: 'cover', border: `1px solid ${c.line}`, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }} />
              )}
              <div style={{ position: 'absolute', left: 48, bottom: 36, display: 'flex', fontSize: 20, color: c.ink3 }}>Priyansh Jha · Product engineer</div>
            </div>
          )}
        </div>
      </div>
    ),
    ogSize,
  );
}
