import React from 'react';

interface DiagramProps {
  type: 'skillbridge' | 'lyf-sync' | 'cloudshield-iq';
}

export const InlineSVGDiagram: React.FC<DiagramProps> = ({ type }) => {
  if (type === 'skillbridge') {
    return (
      <div className="diagram-container" role="region" aria-label="SkillBridge System Architecture Diagram">
        <svg className="diagram-svg" viewBox="0 0 880 260" xmlns="http://www.w3.org/2000/svg">
          {/* Background / framing */}
          <rect x="0" y="0" width="880" height="260" fill="transparent" />

          {/* Module: Students */}
          <rect x="30" y="40" width="160" height="70" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="110" y="65" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600">Students Module</text>
          <text x="110" y="85" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="11">CGPA, Dept, Backlogs, Skills</text>

          {/* Module: Job_Openings */}
          <rect x="30" y="150" width="160" height="70" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="110" y="175" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600">Job_Openings Module</text>
          <text x="110" y="195" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="11">Min CGPA, Criteria, Skills</text>

          {/* Arrow 1: Students & Jobs -> Applications */}
          <line x1="190" y1="75" x2="260" y2="105" stroke="var(--color-ink)" strokeWidth="1.5" />
          <line x1="190" y1="185" x2="260" y2="125" stroke="var(--color-ink)" strokeWidth="1.5" />

          {/* Central Module: Applications */}
          <rect x="260" y="80" width="170" height="80" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
          <text x="345" y="110" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="600">Applications Module</text>
          <text x="345" y="130" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11">Lookup Junction Record</text>
          <text x="345" y="146" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Eligibility & Status Fields</text>

          {/* Arrow 2: Deluge Evaluator */}
          <line x1="430" y1="120" x2="490" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
          <polygon points="490,116 498,120 490,124" fill="var(--color-ink)" />

          {/* Deluge Function Block */}
          <rect x="500" y="70" width="170" height="100" fill="var(--color-code-bg)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="585" y="95" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600">Deluge Function</text>
          <text x="585" y="115" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11">evaluateEligibility()</text>
          <text x="585" y="135" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">CGPA / Backlog / Dept checks</text>
          <text x="585" y="152" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="10">Updates Record via API</text>

          {/* Arrow 3: To Pipeline & Interviews */}
          <line x1="670" y1="120" x2="720" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
          <polygon points="720,116 728,120 720,124" fill="var(--color-ink)" />

          {/* Output Block: Interviews & Embedded Widget */}
          <rect x="730" y="40" width="130" height="70" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="795" y="65" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">Interviews Module</text>
          <text x="795" y="85" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Round Schedule & Mode</text>

          <rect x="730" y="150" width="130" height="70" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="795" y="175" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">ZET Widget (HTML/JS)</text>
          <text x="795" y="195" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Recruitment Dashboard</text>
        </svg>
      </div>
    );
  }

  if (type === 'lyf-sync') {
    return (
      <div className="diagram-container" role="region" aria-label="LYF-Sync System Architecture Diagram">
        <svg className="diagram-svg" viewBox="0 0 880 240" xmlns="http://www.w3.org/2000/svg">
          {/* React Frontend */}
          <rect x="30" y="60" width="180" height="120" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="120" y="90" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="600">React Frontend (Vite)</text>
          <text x="120" y="115" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="11">Multi-Step Onboarding</text>
          <text x="120" y="135" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="11">Routines & Commute Input</text>
          <text x="120" y="155" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="11">Interactive Weekly Grid</text>

          {/* Connection */}
          <line x1="210" y1="120" x2="270" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
          <polygon points="270,116 278,120 270,124" fill="var(--color-ink)" />
          <text x="240" y="110" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">JSON</text>

          {/* FastAPI / Pydantic Layer */}
          <rect x="280" y="60" width="190" height="120" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
          <text x="375" y="90" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="14" fontWeight="600">FastAPI Backend</text>
          <text x="375" y="115" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11">Pydantic Model Validation</text>
          <text x="375" y="135" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">GET/POST /api/profile</text>
          <text x="375" y="155" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">GET /api/plan & /api/health</text>

          {/* Connection */}
          <line x1="470" y1="120" x2="530" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
          <polygon points="530,116 538,120 530,124" fill="var(--color-ink)" />

          {/* Time Allocator logic */}
          <rect x="540" y="60" width="160" height="120" fill="var(--color-code-bg)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="620" y="90" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600">Time-Block Engine</text>
          <text x="620" y="115" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="11">Commute Buffer Math</text>
          <text x="620" y="135" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="11">Fixed Sleep/Work slots</text>
          <text x="620" y="155" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="10">Available Window Slices</text>

          {/* Connection */}
          <line x1="700" y1="120" x2="740" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
          <polygon points="740,116 748,120 740,124" fill="var(--color-ink)" />

          {/* Google Gemini API */}
          <rect x="750" y="70" width="110" height="100" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="805" y="105" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">Google</text>
          <text x="805" y="125" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">Gemini API</text>
          <text x="805" y="145" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">JSON Schedule</text>
        </svg>
      </div>
    );
  }

  // CloudShield IQ
  return (
    <div className="diagram-container" role="region" aria-label="CloudShield IQ System Architecture Diagram">
      <svg className="diagram-svg" viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg">
        {/* Source Telemetry */}
        <rect x="20" y="30" width="130" height="60" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <text x="85" y="55" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">AWS CloudTrail</text>
        <text x="85" y="72" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">JSON / CSV Log</text>

        <rect x="20" y="110" width="130" height="60" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <text x="85" y="135" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">Azure Activity</text>
        <text x="85" y="152" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Administrative Ops</text>

        <rect x="20" y="190" width="130" height="60" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <text x="85" y="215" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">GCP Cloud Audit</text>
        <text x="85" y="232" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">AuditLog Payloads</text>

        {/* Lines to Normalizer */}
        <line x1="150" y1="60" x2="190" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
        <line x1="150" y1="140" x2="190" y2="140" stroke="var(--color-ink)" strokeWidth="1.5" />
        <line x1="150" y1="220" x2="190" y2="160" stroke="var(--color-ink)" strokeWidth="1.5" />

        {/* Unified Normalizer */}
        <rect x="200" y="90" width="150" height="100" fill="var(--color-code-bg)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <text x="275" y="125" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">Telemetry Normalizer</text>
        <text x="275" y="145" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="10">EventSchema Mapping</text>
        <text x="275" y="165" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Principal / Action / IP</text>

        {/* Line to Engine */}
        <line x1="350" y1="140" x2="410" y2="140" stroke="var(--color-ink)" strokeWidth="1.5" />
        <polygon points="410,136 418,140 410,144" fill="var(--color-ink)" />

        {/* Hybrid Engine */}
        <rect x="420" y="30" width="220" height="220" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
        <text x="530" y="58" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="600">Hybrid Risk Engine</text>

        <rect x="435" y="75" width="190" height="48" fill="var(--color-ground)" stroke="var(--color-ink)" strokeWidth="1" />
        <text x="530" y="95" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">Compliance Rules Engine</text>
        <text x="530" y="112" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">CIS (AWS/Azure/GCP) + NIST + ISO + PCI</text>

        <rect x="435" y="133" width="190" height="48" fill="var(--color-ground)" stroke="var(--color-ink)" strokeWidth="1" />
        <text x="530" y="153" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">Isolation Forest (Unsupervised)</text>
        <text x="530" y="170" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Statistical Anomaly Detection</text>

        <rect x="435" y="191" width="190" height="48" fill="var(--color-ground)" stroke="var(--color-ink)" strokeWidth="1" />
        <text x="530" y="211" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">XGBoost + TreeSHAP</text>
        <text x="530" y="228" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="10">Risk Scoring & Feature Attribution</text>

        {/* Output Connection */}
        <line x1="640" y1="140" x2="690" y2="140" stroke="var(--color-ink)" strokeWidth="1.5" />
        <polygon points="690,136 698,140 690,144" fill="var(--color-ink)" />

        {/* Output */}
        <rect x="700" y="70" width="160" height="140" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" />
        <text x="780" y="100" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">FastAPI & PostgreSQL</text>
        <text x="780" y="125" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">Risk Severity Output</text>
        <text x="780" y="145" textAnchor="middle" fill="var(--color-ink)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">React + TS Dashboard</text>
        <text x="780" y="165" textAnchor="middle" fill="var(--color-ink-muted)" fontFamily="var(--font-mono)" fontSize="10">SHAP Force Plot & Guidance</text>
        <text x="780" y="185" textAnchor="middle" fill="var(--color-accent)" fontFamily="var(--font-mono)" fontSize="10">Playwright E2E Verified</text>
      </svg>
    </div>
  );
};

