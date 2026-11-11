import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SkipLink } from './components/layout/SkipLink';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BackToTopButton } from './components/layout/BackToTopButton';
import { HomePage } from './pages/HomePage';
import { SkillBridgeStudy } from './pages/SkillBridgeStudy';
import { LyfSyncStudy } from './pages/LyfSyncStudy';
import { CloudShieldStudy } from './pages/CloudShieldStudy';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="site-wrapper">
        <SkipLink />
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/skillbridge" element={<SkillBridgeStudy />} />
            <Route path="/work/lyf-sync" element={<LyfSyncStudy />} />
            <Route path="/work/cloudshield-iq" element={<CloudShieldStudy />} />
          </Routes>
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </HashRouter>
  );
};

export default App;

