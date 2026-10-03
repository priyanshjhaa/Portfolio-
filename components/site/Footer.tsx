import Uptime from '@/components/fun/Uptime';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>© {new Date().getFullYear()} Priyansh Jha</span>
        <Uptime />
        <span>
          Press <kbd className="kbd">⌘K</kbd> and type <em>“ship it”</em>
        </span>
      </div>
    </footer>
  );
}
