import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const scrollToTarget = (targetId: string) => {
  const el = document.getElementById(targetId);
  if (!el) return;
  const headerHeight = document.querySelector('.site-nav-bar')?.clientHeight || 65;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = Math.max(0, elementPosition - headerHeight - 16);
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/' || location.pathname === '';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (isHome) {
      scrollToTarget(sectionId);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToTarget(sectionId);
      }, 150);
    }
  };

  return (
    <header className="site-nav-bar">
      <div className="main-container nav-inner">
        <Link to="/" className="nav-brand" aria-label="PK - Home">
          PK
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {isHome ? (
            <>
              <a href="#work" onClick={(e) => handleNavClick(e, 'work')} className="nav-link">
                01 Work
              </a>
              <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="nav-link">
                02 Experience
              </a>
              <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="nav-link">
                03 Skills
              </a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">
                04 About
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">
                05 Contact
              </a>
              <a
                href="docs/Praveenkumar_Resume.pdf"
                download="Praveenkumar_Resume.pdf"
                className="nav-link nav-resume-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume &darr;
              </a>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">&larr; Return to Index</Link>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">
                Contact
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
