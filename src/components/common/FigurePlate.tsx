import React from 'react';

interface FigurePlateProps {
  figureNumber: string;
  projectTitle: string;
  subject: string;
  repoName: string;
  imageSrc?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export const FigurePlate: React.FC<FigurePlateProps> = ({
  figureNumber,
  projectTitle,
  subject,
  repoName,
  imageSrc,
  codeSnippet
}) => {
  const caption = `${figureNumber} | ${projectTitle} | ${subject} | ${repoName}`;

  return (
    <figure className="figure-plate">
      <figcaption className="figure-caption-bar">
        <span>{caption}</span>
        {codeSnippet && <span className="mono-meta">SPEC EXCERPT</span>}
        {imageSrc && <span className="mono-meta">VERIFIED CAPTURE</span>}
      </figcaption>
      <div className="figure-content">
        {imageSrc ? (
          <img src={imageSrc} alt={`${projectTitle} - ${subject}`} loading="lazy" />
        ) : codeSnippet ? (
          <div className="code-figure">
            <pre>
              <code>{codeSnippet.code}</code>
            </pre>
          </div>
        ) : null}
      </div>
    </figure>
  );
};

