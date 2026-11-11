import React from 'react';
import { siteContent } from '../content/content';
import { CaseStudyLayout } from '../components/study/CaseStudyLayout';

export const LyfSyncStudy: React.FC = () => {
  const project = siteContent.projects.find((p) => p.slug === 'lyf-sync');

  if (!project) return <div>Project not found.</div>;

  return <CaseStudyLayout project={project} diagramType="lyf-sync" />;
};

