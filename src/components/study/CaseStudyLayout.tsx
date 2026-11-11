import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../content/content';
import { InlineSVGDiagram } from '../common/InlineSVGDiagram';
import { FigurePlate } from '../common/FigurePlate';
import { DetailsBlock } from '../common/DetailsBlock';

interface CaseStudyLayoutProps {
  project: Project;
  diagramType: 'skillbridge' | 'lyf-sync' | 'cloudshield-iq';
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ project, diagramType }) => {
  useEffect(() => {
    document.title = `${project.title} Case Study | Praveenkumar P`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', project.summary);
    }
    window.scrollTo(0, 0);
  }, [project]);

  const { caseStudy } = project;

  return (
    <article className="main-container" style={{ padding: 'var(--space-7) var(--space-5)' }}>
      <nav aria-label="Breadcrumbs" style={{ marginBottom: 'var(--space-5)' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)' }}>
          &larr; Back to Index
        </Link>
      </nav>

      <header className="case-study-header">
        <div className="mono-meta" style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
          CASE STUDY &bull; {project.category}
        </div>
        <h1 className="case-study-title">{project.title}</h1>
        <p className="lead-text" style={{ maxWidth: '52rem' }}>
          {project.summary}
        </p>

        <div className="case-study-meta-bar">
          <span>PERIOD: {project.period}</span>
          <span>ROLE: {project.role}</span>
          <span>CONTEXT: {project.context}</span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-accent)' }}
          >
            GitHub Repository &rarr;
          </a>
        </div>

        <div className="case-study-technologies-bar">
          <span className="mono-meta technologies-label">TECHNOLOGIES:</span>
          <div className="work-stack-list">
            {project.stack.map((t) => (
              <span key={t} className="work-stack-tag">{t}</span>
            ))}
          </div>
        </div>
      </header>

      {/* 1. Overview */}
      <section className="case-study-section">
        <h2>1. Overview</h2>
        <p>{caseStudy.overview}</p>
      </section>

      {/* 2. Problem and Context */}
      <section className="case-study-section">
        <h2>2. Problem &amp; Context</h2>
        <p>{caseStudy.problemAndContext}</p>
      </section>

      {/* 3. What I Did */}
      <section className="case-study-section">
        <h2>3. What I Did</h2>
        <p>{caseStudy.whatIDid}</p>
      </section>

      {/* 4. Constraints */}
      <section className="case-study-section">
        <h2>4. Constraints</h2>
        <ul className="experience-bullets">
          {caseStudy.constraints.map((c, i) => (
            <li key={i} className="experience-bullet">{c}</li>
          ))}
        </ul>
      </section>

      {/* 5. Architecture (Flat Inline SVG) */}
      <section className="case-study-section">
        <h2>5. Architecture</h2>
        <p>
          Flat architectural workflow mapping verified application components, data models, and API interfaces:
        </p>
        <InlineSVGDiagram type={diagramType} />
      </section>

      {/* 6. Key Technical Decisions */}
      <section className="case-study-section">
        <h2>6. Key Technical Decisions</h2>
        {caseStudy.keyDecisions.map((kd, i) => (
          <div key={i} className="decision-card">
            <div className="decision-title">{kd.decision}</div>
            <p style={{ margin: 'var(--space-1) 0 var(--space-2)' }}>
              <strong>Rationale:</strong> {kd.rationale}
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-ink-muted)' }}>
              <strong>Alternatives Considered:</strong> {kd.alternativesConsidered}
            </p>
          </div>
        ))}
      </section>

      {/* 7. Implementation and Workflow */}
      <section className="case-study-section">
        <h2>7. Implementation &amp; Workflow</h2>
        <ul className="experience-bullets">
          {caseStudy.implementationDetails.map((detail, i) => (
            <li key={i} className="experience-bullet">{detail}</li>
          ))}
        </ul>
      </section>

      {/* 8. Artifacts (Figure Plates with verifiable code/spec) */}
      <section className="case-study-section">
        <h2>8. Verified Artifacts</h2>
        <p>
          Real, verifiable code excerpts from the project repository:
        </p>
        {caseStudy.codeExcerpts.map((excerpt, i) => (
          <FigurePlate
            key={i}
            figureNumber={`FIG. 0${i + 1}`}
            projectTitle={project.title}
            subject={excerpt.caption}
            repoName={project.githubUrl.split('/').pop() || project.title}
            codeSnippet={{
              language: excerpt.language,
              code: excerpt.code
            }}
          />
        ))}

        <DetailsBlock summary="Deep Dive: Architectural Notes & Verification Details">
          <p>
            All business logic and endpoints documented above trace directly to the repository structure. No unverified integrations or third-party claims are made.
          </p>
        </DetailsBlock>
      </section>

      {/* 9. Outcome */}
      <section className="case-study-section">
        <h2>9. Outcome</h2>
        <p>{caseStudy.outcome}</p>
      </section>

      {/* 10. Limitations */}
      <section className="case-study-section">
        <h2>10. Limitations &amp; Scope Boundaries</h2>
        <ul className="experience-bullets">
          {caseStudy.limitations.map((lim, i) => (
            <li key={i} className="experience-bullet">{lim}</li>
          ))}
        </ul>
      </section>

      {/* 11. What I Learned */}
      <section className="case-study-section">
        <h2>11. What I Learned</h2>
        <p>{caseStudy.whatILearned}</p>
      </section>

      <footer style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-7)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <Link to="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)' }}>
          &larr; Return to Work Index
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)' }}
        >
          View Source Repository on GitHub &rarr;
        </a>
      </footer>
    </article>
  );
};

