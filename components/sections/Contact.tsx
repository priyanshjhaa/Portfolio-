import { Github, Linkedin, Mail } from 'lucide-react';
import { contact } from '@/lib/data';

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
    <section className="py-24 px-4 border-t border-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-sm" />
            Connection
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Get in Touch
          </h2>

          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <p className="text-sm font-bold text-accent">Open to work</p>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors mb-4 relative" />
                <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors mb-1 relative">
                  {link.name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted relative">
                  {link.label}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-accent/0 group-hover:bg-accent/30 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
