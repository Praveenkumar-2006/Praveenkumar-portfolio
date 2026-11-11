import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../content/content';
import { scrollToTarget } from '../layout/Header';
import { ThemeToggle } from '../layout/ThemeToggle';

export const HeroSection: React.FC = () => {
  const { personal } = siteContent;
  const [photoError, setPhotoError] = useState(false);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget('work');
  };

  const ledgerRows = [
    {
      num: '_01',
      name: 'SkillBridge',
      slug: 'skillbridge',
      stack: 'Zoho CRM, Deluge, CRM APIs',
      period: 'Jul-Aug 2026',
      status: 'Built during internship'
    },
    {
      num: '_02',
      name: 'LYF-Sync',
      slug: 'lyf-sync',
      stack: 'FastAPI, React, Gemini API',
      period: 'Apr 2026',
      status: 'Built'
    },
    {
      num: '_03',
      name: 'CloudShield IQ',
      slug: 'cloudshield-iq',
      stack: 'FastAPI, PostgreSQL, React, scikit-learn, XGBoost, SHAP',
      period: '2026',
      status: 'In development'
    }
  ];

  return (
    <section className="hero-spec-section" aria-labelledby="hero-name">
      <div className="main-container hero-container-rel">
        {/* Desktop left margin rail: email in vertical-rl */}
        <div className="hero-vertical-email-rail" aria-hidden="true">
          <a href={`mailto:${personal.contact.email}`} className="hero-vertical-email-link">
            {personal.contact.email}
          </a>
        </div>

        <div className="hero-content-wrapper">
          {/* Row 1: Top strip in IBM Plex Mono */}
          <div className="hero-top-strip">
            <span className="hero-top-left">Praveenkumar P / Kanchipuram, India</span>
            <div className="hero-top-right-group">
              <span className="hero-top-right">B.Tech IT, 2027</span>
              <ThemeToggle />
            </div>
          </div>
          <div className="hero-rule-draw" aria-hidden="true" />

          {/* Row 2: 12-column grid (Left 7 cols, Right 5 cols) */}
          <div className={`hero-main-grid ${photoError ? 'no-photo' : ''}`}>
            <div className="hero-left-col">
              <h1 id="hero-name" className="hero-condensed-name">
                <span className="hero-name-line-mask">
                  <span className="hero-name-line hero-line-1">Praveen</span>
                </span>
                <span className="hero-name-line-mask">
                  <span className="hero-name-line hero-line-2">
                    kumar <span className="hero-name-accent">P</span>
                  </span>
                </span>
              </h1>

              <p className="hero-editorial-sentence">
                I build full-stack, AI and cloud applications. In July-August 2026 I interned on Zoho's Healthcare team and built SkillBridge, a CRM placement system in Deluge.
              </p>

              <div className="hero-controls-row">
                <a
                  href="#work"
                  onClick={handleScrollToProjects}
                  className="hero-btn-primary"
                >
                  See my projects
                </a>
                <a
                  href={`mailto:${personal.contact.email}`}
                  className="hero-link-email"
                >
                  Email me
                </a>
                <a
                  href="docs/Praveenkumar_Resume.pdf"
                  download="Praveenkumar_Resume.pdf"
                  className="hero-btn-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Praveenkumar's Resume PDF"
                >
                  Resume PDF &darr;
                </a>
              </div>

              <div className="hero-availability-line">
                <span className="hero-avail-square" aria-hidden="true" />
                <span>Open to internships and entry-level software roles.</span>
              </div>
            </div>

            {!photoError && personal.photo?.src && (
              <div className="hero-right-col">
                <div className="hero-photo-offset-wrapper">
                  <div className="hero-cobalt-backdrop" aria-hidden="true" />
                  <picture className="hero-picture-tag">
                    {personal.photo.webpSrcSet && (
                      <source srcSet={personal.photo.webpSrcSet} type="image/webp" />
                    )}
                    <img
                      src={personal.photo.src}
                      alt={personal.photo.alt || personal.name}
                      width="320"
                      height="400"
                      className="hero-spec-photo"
                      onError={() => setPhotoError(true)}
                    />
                  </picture>
                </div>
              </div>
            )}
          </div>

          {/* Row 3: Build Ledger */}
          <div className="hero-ledger-container" aria-label="Build ledger">
            <div className="hero-ledger-list">
              {ledgerRows.map((row, idx) => (
                <Link
                  key={row.slug}
                  to={`/work/${row.slug}`}
                  className="hero-ledger-row"
                  style={{ animationDelay: `${120 + idx * 90}ms` }}
                >
                  <div className="hero-ledger-col-num">{row.num}</div>
                  <div className="hero-ledger-col-name">
                    <span className="hero-ledger-title">{row.name}</span>
                    <span className="hero-ledger-arrow" aria-hidden="true">&rarr;</span>
                  </div>
                  <div className="hero-ledger-col-stack">{row.stack}</div>
                  <div className="hero-ledger-col-period">{row.period}</div>
                  <div className="hero-ledger-col-status">{row.status}</div>
                </Link>
              ))}
            </div>

            {/* Below ledger: verified stack with middle dots */}
            <div className="hero-verified-stack-line">
              Python &bull; TypeScript &bull; FastAPI &bull; React &bull; PostgreSQL &bull; Zoho CRM &bull; Deluge
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
