import React from 'react';
import { scrollToTarget } from './Header';

export const MarginRail: React.FC = () => {
  const handleRailClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToTarget(sectionId);
  };

  return (
    <aside className="margin-rail" aria-label="Section index">
      <nav className="rail-nav">
        <a href="#work" onClick={(e) => handleRailClick(e, 'work')} className="rail-item">
          <span className="rail-num">01</span>
          <span className="rail-label">Work</span>
        </a>
        <a href="#experience" onClick={(e) => handleRailClick(e, 'experience')} className="rail-item">
          <span className="rail-num">02</span>
          <span className="rail-label">Experience</span>
        </a>
        <a href="#skills" onClick={(e) => handleRailClick(e, 'skills')} className="rail-item">
          <span className="rail-num">03</span>
          <span className="rail-label">Skills</span>
        </a>
        <a href="#about" onClick={(e) => handleRailClick(e, 'about')} className="rail-item">
          <span className="rail-num">04</span>
          <span className="rail-label">About</span>
        </a>
        <a href="#contact" onClick={(e) => handleRailClick(e, 'contact')} className="rail-item">
          <span className="rail-num">05</span>
          <span className="rail-label">Contact</span>
        </a>
      </nav>
    </aside>
  );
};
