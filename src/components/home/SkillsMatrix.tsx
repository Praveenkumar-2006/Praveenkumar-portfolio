import React from 'react';
import { siteContent, SkillCategory } from '../../content/content';

export const SkillsMatrix: React.FC = () => {
  const { skills } = siteContent;

  return (
    <section id="skills" className="journal-section" aria-labelledby="skills-heading">
      <div className="section-header">
        <span className="section-index">03</span>
        <h2 id="skills-heading" className="section-title">Skills</h2>
        <span className="mono-meta">Grouped Inventory</span>
      </div>

      <div className="skills-plain-grid">
        {skills.map((group: SkillCategory) => (
          <div key={group.category} className="skill-plain-group">
            <h3 className="skill-group-heading">{group.category}</h3>
            <ul className="skill-plain-list">
              {group.skills.map((item: string) => (
                <li key={item} className="skill-plain-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
