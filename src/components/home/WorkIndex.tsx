import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent, Project } from '../../content/content';

export const WorkIndex: React.FC = () => {
  const { projects } = siteContent;

  return (
    <section id="work" className="journal-section" aria-labelledby="work-heading">
      <div className="section-header">
        <span className="section-index">01</span>
        <h2 id="work-heading" className="section-title">Featured Work</h2>
        <span className="mono-meta">Engineering Implementations</span>
      </div>

      <div className="work-featured-list">
        {projects.map((proj: Project, idx: number) => {
          const markerNumber = `_0${idx + 1}.`;

          return (
            <article key={proj.slug} className="work-featured-entry no-plate">
              <div className="work-featured-text">
                <div className="work-marker">{markerNumber}</div>
                <h3 className="work-featured-title">{proj.title}</h3>

                <div className="work-mono-stack">
                  {proj.stack.join(' · ')}
                </div>

                <p className="work-description">
                  {proj.summary}
                </p>

                <div className="work-evidence-line">
                  <strong>Implementation evidence:</strong> {proj.concreteEvidence}
                </div>

                <div className="work-action-links">
                  <Link to={`/work/${proj.slug}`}>Case study &rarr;</Link>
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub &rarr;
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
