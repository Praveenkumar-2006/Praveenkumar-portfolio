import React, { useState } from 'react';
import { siteContent } from '../../content/content';

export const ContactSection: React.FC = () => {
  const { personal } = siteContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="contact-section-minimal" aria-labelledby="contact-heading">
      <div className="main-container">
        <div className="contact-minimal-content">
          <div className="mono-caption" style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
            _04. CONTACT
          </div>
          <h2 id="contact-heading" className="contact-minimal-heading">
            Get in touch
          </h2>

          <div className="contact-email-wrapper">
            <a
              href={`mailto:${personal.contact.email}`}
              className="contact-display-email"
            >
              {personal.contact.email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="copy-btn copy-btn-minimal"
              aria-label="Copy email address"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
