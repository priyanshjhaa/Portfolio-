import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { contact, sectionCopy } from '@/lib/data';

export default function Contact() {
  const links = [
    {
      name: 'GitHub',
      href: contact.github,
      icon: Github,
      label: 'View code',
    },
    {
      name: 'LinkedIn',
      href: contact.linkedin,
      icon: Linkedin,
      label: 'Connect',
    },
    {
      name: 'Email',
      href: `mailto:${contact.email}`,
      icon: Mail,
      label: 'Get in touch',
    },
  ];

  return (
    <section className="section-shell section-shell-alt relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 grid-pattern opacity-18 md:opacity-30" />
      <div className="absolute inset-0 topographic-pattern opacity-15 pointer-events-none" />
      <div className="ambient-orb right-[8%] top-[8%] h-[320px] w-[320px] opacity-55 md:h-[480px] md:w-[480px]" />

      <div className="relative z-10 mx-auto max-w-[1080px]">
        <div className="panel-chrome hud-corners rounded-[34px] p-6 md:p-8">
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.86fr)] lg:items-start">
            <div>
              <p className="section-kicker mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-sm bg-accent" />
                {sectionCopy.contact.eyebrow}
              </p>
              <h2 className="section-heading mb-4">{sectionCopy.contact.title}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">
                {sectionCopy.contact.description}
              </p>

              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-accent/15 bg-accent/10 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-accent/80">{sectionCopy.contact.availabilityTitle}</p>
                  <p className="text-sm font-semibold text-accent">{sectionCopy.contact.availabilityValue}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/6 bg-black/20 p-5 md:p-6">
              <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.24em] text-text-muted">{sectionCopy.contact.linksTitle}</p>
                  <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-[0.08em] text-text-primary">
                    {sectionCopy.contact.linksHeading}
                  </p>
                </div>
                <div className="rounded-xl border border-white/6 bg-white/[0.03] px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  {sectionCopy.contact.linksStatus}
                </div>
              </div>

              <div className="grid gap-3">
                {links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.025] px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent/[0.05]"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/15 bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-sm uppercase tracking-[0.16em] text-text-primary">
                            {link.name}
                          </p>
                          <p className="mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-text-muted">
                            {link.label}
                          </p>
                        </div>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
