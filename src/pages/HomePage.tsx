import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarginRail } from '../components/layout/MarginRail';
import { WorkIndex } from '../components/home/WorkIndex';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { SkillsMatrix } from '../components/home/SkillsMatrix';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Praveenkumar P | Software Developer: Full-Stack, AI and Cloud';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Praveenkumar P - Information Technology undergraduate (2027) building full-stack, AI, and cloud software. Ex-CRM Intern at Zoho Healthcare; creator of SkillBridge.'
      );
    }
  }, []);

  return (
    <>
      <HeroSection />

      <div className="main-container">
        <div className="journal-layout">
          <MarginRail />
          <div id="main-content" className="journal-content">
            <WorkIndex />
            <ExperienceSection />
            <SkillsMatrix />
            <AboutSection />
          </div>
        </div>
      </div>

      <ContactSection />
    </>
  );
};
