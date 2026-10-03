import { ArrowUpRight, Mail } from 'lucide-react';
import { contact } from '@/lib/data';
import CopyEmail from '@/components/site/CopyEmail';

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap" data-reveal>
        <p className="eyebrow">04 / Final checkpoint · The next system starts with a conversation</p>
        <h2 id="contact-title" className="display contact__title">
          Have a difficult <em>product problem?</em>
        </h2>
        <p className="lede contact__lede">
          {contact.operatingStatement} {contact.response}.
        </p>

        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${contact.email}`}>
            <Mail aria-hidden="true" /> {contact.email}
          </a>
          <CopyEmail />
        </div>

        <dl className="contact__facts">
          <div>
            <dt>Availability</dt>
            <dd>{contact.availability}</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{contact.location}</dd>
          </div>
          <div>
            <dt>Works</dt>
            <dd>{contact.collaboration}</dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd className="contact__elsewhere">
              <a className="text-link" href={contact.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="text-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="text-link" href={contact.x} target="_blank" rel="noopener noreferrer">
                X <ArrowUpRight aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
