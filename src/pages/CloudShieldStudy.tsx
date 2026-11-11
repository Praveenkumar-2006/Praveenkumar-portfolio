import React from 'react';
import { siteContent } from '../content/content';
import { CaseStudyLayout } from '../components/study/CaseStudyLayout';

export const CloudShieldStudy: React.FC = () => {
  const project = siteContent.projects.find((p) => p.slug === 'cloudshield-iq');

  if (!project) return <div>Project not found.</div>;

  return <CaseStudyLayout project={project} diagramType="cloudshield-iq" />;
};

