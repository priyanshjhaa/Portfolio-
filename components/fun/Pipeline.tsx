/**
 * A tiny animated pipeline of a project's flow steps: a packet travels the
 * line and each step lights up as it passes. Pure CSS, so it costs nothing.
 */
export default function Pipeline({ steps, duration = 6 }: { steps: string[]; duration?: number }) {
  return (
    <div className="pipeline" style={{ ['--steps' as string]: steps.length, ['--dur' as string]: `${duration}s` }} aria-label={`Flow: ${steps.join(' → ')}`} role="img">
      <div className="pipeline__line" aria-hidden="true">
        <span className="pipeline__packet" />
      </div>
      <ol className="pipeline__steps" aria-hidden="true">
        {steps.map((step, index) => (
          <li key={step} style={{ ['--i' as string]: index }}>
            <i />
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
