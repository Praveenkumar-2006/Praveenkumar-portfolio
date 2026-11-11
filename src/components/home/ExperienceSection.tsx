import React from 'react';
import { siteContent, ExperienceRow } from '../../content/content';

export const ExperienceSection: React.FC = () => {
  const { experienceRows } = siteContent;

  return (
    <section id="experience" className="journal-section" aria-labelledby="experience-heading">
      <div className="section-header">
        <span className="section-index">02</span>
        <h2 id="experience-heading" className="section-title">Experience</h2>
        <span className="mono-meta">History</span>
      </div>

      <div className="experience-compact-table">
        {experienceRows.map((item: ExperienceRow, idx: number) => (
          <div key={idx} className="experience-compact-row">
            <div className="exp-org-cell">
              <strong>{item.organization}</strong>
              {item.teamOrDetails && (
                <span className="exp-team-detail"> &bull; {item.teamOrDetails}</span>
              )}
            </div>
            <div className="exp-role-cell">{item.role}</div>
            <div className="exp-date-cell mono-meta">{item.period}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
