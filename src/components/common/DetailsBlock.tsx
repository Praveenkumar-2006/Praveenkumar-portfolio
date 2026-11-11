import React from 'react';

interface DetailsBlockProps {
  summary: string;
  children: React.ReactNode;
}

export const DetailsBlock: React.FC<DetailsBlockProps> = ({ summary, children }) => {
  return (
    <details className="journal-details">
      <summary className="journal-summary">
        {summary}
      </summary>
      <div className="journal-details-body">
        {children}
      </div>
    </details>
  );
};

