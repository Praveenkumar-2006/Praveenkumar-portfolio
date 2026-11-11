import React from 'react';
import { siteContent } from '../../content/content';

export const Footer: React.FC = () => {
  const { personal } = siteContent;

  return (
    <footer className="site-footer">
      <div className="main-container footer-inner">
        <div className="footer-identity">
          <span>{personal.name} &bull; {personal.location}</span>
        </div>
        <div className="footer-links">
          <a
            href="docs/Praveenkumar_Resume.pdf"
            download="Praveenkumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-text-link"
          >
            Resume (PDF) &darr;
          </a>
          <a
            href={personal.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-text-link"
          >
            GitHub &rarr;
          </a>
          <a
            href={personal.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-text-link"
          >
            LinkedIn &rarr;
          </a>
          <a
            href={`mailto:${personal.contact.email}`}
            className="footer-text-link"
          >
            Email &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
};
