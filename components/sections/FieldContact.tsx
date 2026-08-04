import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { contact } from '@/lib/data';

export default function FieldContact({ active = false }: { active?: boolean }) {
  return (
    <footer id="contact" className="relative overflow-hidden px-4 pb-8 pt-20 md:px-8 md:pt-28">
      <div className="contact-marquee border-y border-white/8 py-4" aria-hidden="true">
        <div className="contact-marquee-track flex min-w-max gap-10 font-editorial text-2xl italic text-text-muted">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} className="flex items-center gap-10">
              Open to remote startup roles
              <span className="h-1.5 w-1.5 rounded-full bg-[#b7c6aa]" />
              Product engineering
              <span className="h-1.5 w-1.5 rounded-full bg-[#b7c6aa]" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${active ? 'bg-[#b7c6aa] shadow-[0_0_18px_rgba(183,198,170,.55)]' : 'bg-text-muted'}`} />
              <p className="field-label">{contact.availability}</p>
            </div>
            <h2 className="mt-7 max-w-4xl font-editorial text-[clamp(4rem,8vw,8rem)] leading-[0.86] tracking-[-0.06em] text-text-primary">
              Have a difficult
              <br />
              product problem?
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary">{contact.focus}</p>
            <blockquote className="mt-9 max-w-2xl border-l border-[#b7c6aa]/35 pl-5 font-editorial text-2xl italic leading-relaxed text-text-primary md:text-3xl">
              {contact.operatingStatement}
            </blockquote>
          </div>

          <div className="w-full lg:max-w-md lg:justify-self-end">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex min-h-[64px] w-full items-center justify-between gap-5 rounded-full bg-[#e7e5df] px-8 text-base font-medium text-[#101110] transition hover:bg-white"
            >
              Let&apos;s build something useful
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <div className="mt-5 divide-y divide-white/8 rounded-[24px] border border-white/10 bg-[#10110f]/68 px-5">
              <div className="grid grid-cols-[105px_1fr] gap-4 py-4">
                <p className="field-label">Base</p>
                <p className="text-sm text-text-secondary">{contact.location}</p>
              </div>
              <div className="grid grid-cols-[105px_1fr] gap-4 py-4">
                <p className="field-label">Working mode</p>
                <p className="text-sm text-text-secondary">{contact.collaboration}</p>
              </div>
              <div className="grid grid-cols-[105px_1fr] gap-4 py-4">
                <p className="field-label">Best channel</p>
                <p className="text-sm text-text-secondary">{contact.response}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-5">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={contact.x} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted hover:text-text-primary">
                X / Twitter
              </a>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 border-t border-white/8 py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Priyansh Jha / Full-stack product engineer</p>
        <p>Designed around the work, not the template.</p>
      </div>
    </footer>
  );
}
