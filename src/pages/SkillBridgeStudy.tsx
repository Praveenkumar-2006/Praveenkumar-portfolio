import React from 'react';
import { siteContent } from '../content/content';
import { CaseStudyLayout } from '../components/study/CaseStudyLayout';

export const SkillBridgeStudy: React.FC = () => {
  const project = siteContent.projects.find((p) => p.slug === 'skillbridge');

  if (!project) return <div>Project not found.</div>;

  return <CaseStudyLayout project={project} diagramType="skillbridge" />;
};

