import React from 'react';
import { siteContent } from '../../content/content';

export const AboutSection: React.FC = () => {
  const { personal } = siteContent;

  return (
    <section id="about" className="journal-section" aria-labelledby="about-heading">
      <div className="section-header">
        <span className="section-index">04</span>
        <h2 id="about-heading" className="section-title">Background</h2>
        <span className="mono-meta">Operational Context &amp; Milestones</span>
      </div>

      <div className="about-bio-full">
        <p className="lead-text">
          I am an Information Technology undergraduate based in {personal.location}, graduating in {personal.education.expectedGraduation}.
        </p>

        <p>
          My engineering work focuses on full-stack application development, enterprise CRM workflow engineering, and explainable machine learning. In July–August 2026, I interned with Zoho Corporation's Healthcare team in Chennai, building relational CRM systems, Deluge custom evaluation functions, and embedded dashboards.
        </p>

        <p>
          I am currently preparing for internship, graduate, and entry-level software engineering roles across full-stack engineering, cloud systems, and applied AI. My approach prioritizes deterministic data modeling, rigorous API schema enforcement, and transparent, reproducible logic over black-box abstractions.
        </p>

        <div className="academic-milestone-box">
          <span className="mono-meta" style={{ display: 'block', marginBottom: 'var(--space-2)', color: 'var(--color-accent)' }}>
            Academic Milestone
          </span>
          <p style={{ margin: 0, color: 'var(--color-ink)' }}>
            <strong>{personal.education.degree} in {personal.education.branch}</strong><br />
            <span style={{ color: 'var(--color-ink-muted)' }}>
              {personal.education.institution} &bull; {personal.education.period}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
