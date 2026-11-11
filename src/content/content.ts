export interface Project {
  slug: string;
  title: string;
  category: string;
  period: string;
  role: string;
  context: string;
  statusLabel?: string;
  githubUrl: string;
  stack: string[];
  summary: string;
  concreteEvidence: string;
  caseStudy: {
    overview: string;
    problemAndContext: string;
    whatIDid: string;
    constraints: string[];
    keyDecisions: {
      decision: string;
      rationale: string;
      alternativesConsidered: string;
    }[];
    implementationDetails: string[];
    codeExcerpts: {
      caption: string;
      language: string;
      code: string;
    }[];
    outcome: string;
    limitations: string[];
    whatILearned: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceRow {
  organization: string;
  teamOrDetails?: string;
  period: string;
  role: string;
}

export interface SiteContent {
  personal: {
    name: string;
    headline: string;
    positioning: string;
    location: string;
    photo?: {
      src: string;
      webpSrcSet?: string;
      alt?: string;
    };
    education: {
      degree: string;
      branch: string;
      institution: string;
      period: string;
      expectedGraduation: string;
    };
    contact: {
      email: string;
      github: string;
      linkedin: string;
      repositories: {
        skillbridge: string;
        lyfSync: string;
        cloudshieldIq: string;
      };
    };
  };
  skills: SkillCategory[];
  experienceRows: ExperienceRow[];
  projects: Project[];
}

export const siteContent: SiteContent = {
  personal: {
    name: "Praveenkumar P",
    headline: "Information Technology Undergraduate | Full-Stack, AI and Cloud Applications",
    positioning:
      "Information Technology undergraduate building full-stack, AI and cloud applications. Completed a July–August 2026 internship with Zoho's Healthcare team, where I developed SkillBridge, a CRM-based placement management system using Deluge and an embedded web interface. Currently developing CloudShield IQ, a cloud security risk assessment platform combining deterministic rules and machine learning.",
    location: "Kanchipuram, Tamil Nadu, India",
    photo: {
      src: "assets/profile.jpg",
      webpSrcSet: "assets/profile-960.webp 960w, assets/profile-480.webp 480w",
      alt: "Praveenkumar P"
    },
    education: {
      degree: "Bachelor of Technology (B.Tech)",
      branch: "Information Technology",
      institution: "Rajalakshmi Engineering College",
      period: "2023 – 2027",
      expectedGraduation: "2027"
    },
    contact: {
      email: "praveenkumar.06.09.latha@gmail.com",
      github: "https://github.com/Praveenkumar-2006",
      linkedin: "https://www.linkedin.com/in/praveenkumar-p-b9a240422/",
      repositories: {
        skillbridge: "https://github.com/Praveenkumar-2006/SkillBridge",
        lyfSync: "https://github.com/Praveenkumar-2006/LYF-Sync",
        cloudshieldIq: "https://github.com/Praveenkumar-2006/Cloudshield-IQ"
      }
    }
  },

  skills: [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "Deluge", "HTML5", "CSS3"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "Vite", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend",
      skills: ["FastAPI", "Node.js", "Express.js", "REST APIs", "API integration", "Pydantic"]
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL"]
    },
    {
      category: "Zoho and CRM",
      skills: [
        "Zoho CRM",
        "Zoho Books",
        "Zoho Forms",
        "CRM workflows",
        "Custom functions",
        "Lookup fields",
        "Zia"
      ]
    },
    {
      category: "Machine Learning",
      skills: ["Scikit-learn", "XGBoost", "Isolation Forest", "SHAP"]
    },
    {
      category: "Tools and Cloud",
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "Linux",
        "Postman",
        "Playwright",
        "VS Code",
        "Figma",
        "AWS Foundations"
      ]
    },
    {
      category: "CS fundamentals",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "DBMS",
        "Operating Systems",
        "Computer Networks"
      ]
    }
  ],

  experienceRows: [
    {
      organization: "Zoho Corporation",
      teamOrDetails: "Healthcare team",
      period: "July–August 2026",
      role: "CRM Intern"
    }
  ],

  projects: [
    {
      slug: "skillbridge",
      title: "SkillBridge",
      category: "CRM-Based Placement Management System",
      period: "2026",
      role: "CRM Developer & Full-Stack Intern",
      context: "Zoho Internship Project (Healthcare Team)",
      githubUrl: "https://github.com/Praveenkumar-2006/SkillBridge",
      stack: ["Zoho CRM", "Deluge", "CRM APIs", "Zia", "HTML", "CSS", "JavaScript", "Zoho Embedded App SDK"],
      summary:
        "A placement management system built on Zoho CRM that unifies student profiles, company recruitment drives, and applications into an automated, relational workflow with custom Deluge eligibility verification.",
      concreteEvidence:
        "Deluge eligibility function evaluating student CGPA, active backlogs, department, and required skills against job openings; embedded recruitment dashboard via Zoho Embedded App SDK; Zia used strictly for read-only retrieval.",
      caseStudy: {
        overview:
          "SkillBridge was built during my internship on Zoho's Healthcare team to replace fragmented placement spreadsheets with a relational system inside Zoho CRM. It links student profiles, job postings, application submissions, and interview rounds with automated Deluge eligibility screening.",
        problemAndContext:
          "College placement coordination involves tracking hundreds of student profiles across dozens of corporate eligibility criteria. Disconnected spreadsheets cause delayed application verifications, manual human error during shortlisting, and zero real-time visibility into student interview pipelines.",
        whatIDid:
          "I designed the relational CRM schema using lookup fields, wrote Deluge custom functions to validate student eligibility rules, configured automated stage transitions, integrated Zoho CRM APIs for record operations, and built an embedded web dashboard with the Zoho Embedded App SDK (ZET) to give placement officers unified oversight.",
        constraints: [
          "Deluge execution timeout limits required lean record querying and avoiding nested loop API calls.",
          "Zia was constrained strictly to read-only retrieval of student and placement data; no autonomous updates or write actions were delegated to AI.",
          "CRM lookup field dependencies required strict relational validation before triggering pipeline stage transitions."
        ],
        keyDecisions: [
          {
            decision: "Deluge Custom Functions over standard validation rules",
            rationale: "Standard validation rules cannot cross-evaluate multi-attribute criteria (CGPA threshold, zero active backlogs, department matching, and specific skill set arrays) across multiple related records simultaneously.",
            alternativesConsidered: "Manual verification by staff (error-prone and unscalable) or client-side JavaScript validation (bypassed if records are updated via API)."
          },
          {
            decision: "Zoho Embedded App SDK (ZET) widget for the operations dashboard",
            rationale: "Placement staff needed a dense, single-screen command center displaying pipeline status, upcoming interviews, and shortlists without clicking through multiple distinct CRM module tabs.",
            alternativesConsidered: "Native CRM list views only (lacked unified cross-module pipeline visualization)."
          }
        ],
        implementationDetails: [
          "Configured four custom CRM modules: Students, Job_Openings, Applications, and Interviews, connected via bidirectional lookup relationships.",
          "Engineered a Deluge eligibility evaluator that retrieves student academic metrics and matches them against the hiring company's minimum CGPA, maximum backlogs, eligible departments, and mandatory technical skills.",
          "Built automated workflow triggers that advance eligible applicants from 'Applied' to 'Shortlisted' and dispatch automated interview schedules.",
          "Implemented read-only Zia assistant integration for placement coordinators to query interview logistics and candidate counts using natural language."
        ],
        codeExcerpts: [
          {
            caption: "FIG. 01 | SkillBridge | Deluge Custom Function: Multi-Factor Eligibility Check",
            language: "deluge",
            code: `// Deluge Custom Function: evaluateEligibility
student = zoho.crm.getRecordById("Students", studentId);
job = zoho.crm.getRecordById("Job_Openings", jobId);

studentCGPA = student.get("CGPA").toDecimal();
studentBacklogs = student.get("Active_Backlogs").toLong();
studentDept = student.get("Department");
studentSkills = student.get("Skills");

minCGPA = job.get("Minimum_CGPA").toDecimal();
maxBacklogs = job.get("Max_Backlogs").toLong();
eligibleDepts = job.get("Eligible_Departments");
requiredSkills = job.get("Required_Skills");

isEligible = true;
reason = "";

if(studentCGPA < minCGPA) {
    isEligible = false;
    reason = reason + "CGPA below requirement (" + studentCGPA + " < " + minCGPA + "). ";
}
if(studentBacklogs > maxBacklogs) {
    isEligible = false;
    reason = reason + "Active backlogs exceed limit (" + studentBacklogs + " > " + maxBacklogs + "). ";
}
if(!eligibleDepts.contains(studentDept)) {
    isEligible = false;
    reason = reason + "Department " + studentDept + " not eligible. ";
}

updateData = Map();
updateData.put("Eligibility_Status", if(isEligible, "Eligible", "Not Eligible"));
updateData.put("Eligibility_Reason", reason);
updateResponse = zoho.crm.updateRecord("Applications", applicationId, updateData);
return isEligible;`
          }
        ],
        outcome:
          "Eliminated manual spreadsheet comparisons by providing instant, rule-verified application screening across four academic parameters, coupled with an operational dashboard tracking candidate progression from application to final offer.",
        limitations: [
          "Zia operates purely as a read-only query helper; all state transitions and evaluations are governed by deterministic Deluge functions.",
          "No institution-wide production deployment claimed; verified in developer and internship test environments."
        ],
        whatILearned:
          "Learned enterprise data modeling in a multi-tenant CRM environment, API error handling under rate limits, execution-log debugging in Deluge, and how to build responsive custom widgets inside enterprise application iframes."
      }
    },

    {
      slug: "lyf-sync",
      title: "LYF-Sync",
      category: "AI-Powered Schedule Planner",
      period: "April 2026",
      role: "Full-Stack Developer",
      context: "Personal Full-Stack Project",
      githubUrl: "https://github.com/Praveenkumar-2006/LYF-Sync",
      stack: ["Python", "FastAPI", "Pydantic", "React", "Vite", "Tailwind CSS", "Google Gemini API"],
      summary:
        "A full-stack schedule planner that translates user routines, fixed commitments, and travel constraints into structured weekly time blocks with Gemini API reasoning.",
      concreteEvidence:
        "FastAPI service with Pydantic validation across four verified endpoints (/api/profile, /api/plan, /api/health); multi-step onboarding collecting commute and habit preferences; interactive React weekly plan dashboard.",
      caseStudy: {
        overview:
          "LYF-Sync is a full-stack personal scheduling platform that collects daily habits, working hours, and commute times, and organizes them into an optimized weekly routine using deterministic constraint validation and Google Gemini API assistance.",
        problemAndContext:
          "Modern schedule planners frequently suffer from two extremes: rigid calendar templates that fail when daily delays happen, or unconstrained LLM chat interfaces that produce hallucinated, overlapping time slots without respecting real physical commute intervals.",
        whatIDid:
          "I architected both backend and frontend: created strict Pydantic schemas to validate user inputs, built a deterministic time-block allocator in Python that computes commute buffers, integrated Gemini API prompts constrained by structured JSON outputs, and built a multi-step onboarding workflow and weekly dashboard in React.",
        constraints: [
          "Gemini API generation had to be strictly constrained via system instructions to return structured JSON matching frontend data interfaces without markdown preamble.",
          "Time intervals had to account for non-zero transit times and fixed sleeping/work hours before scheduling flexible tasks."
        ],
        keyDecisions: [
          {
            decision: "FastAPI with Pydantic validation over Flask/Django",
            rationale: "Provides automatic OpenAPI schema generation, strict type enforcement on incoming payloads, and asynchronous request handling for external LLM API calls.",
            alternativesConsidered: "Express/Node.js (viable, but Python allows seamless integration of data science and AI SDKs in the same runtime)."
          },
          {
            decision: "Two-stage scheduling: Deterministic boundary checks first, LLM distribution second",
            rationale: "Prevents LLMs from scheduling tasks during user sleeping windows, work shifts, or commute times by pre-calculating free time windows before dispatching to the prompt.",
            alternativesConsidered: "Direct raw prompting to LLM (frequently resulted in impossible overlapping intervals)."
          }
        ],
        implementationDetails: [
          "Engineered four primary API endpoints: GET /api/profile, POST /api/profile, GET /api/plan, and GET /api/health.",
          "Implemented Pydantic models for UserProfile, RoutineItem, FixedCommitment, and ScheduleBlock.",
          "Built a multi-step onboarding wizard in React to capture wake-up times, commute types, target study hours, and recurring weekly commitments.",
          "Constructed a weekly grid dashboard rendering visual time blocks color-coded by category (Deep Work, Commute, Routine, Leisure)."
        ],
        codeExcerpts: [
          {
            caption: "FIG. 02 | LYF-Sync | Pydantic Schema & FastAPI Endpoint Architecture",
            language: "python",
            code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(title="LYF-Sync API", version="1.0.0")

class TimeWindow(BaseModel):
    start_time: str = Field(..., pattern=r"^([01]\d|2[0-3]):([0-5]\d)$")
    end_time: str = Field(..., pattern=r"^([01]\d|2[0-3]):([0-5]\d)$")

class UserPreferences(BaseModel):
    user_id: str
    wake_time: str
    sleep_time: str
    commute_minutes_per_day: int = Field(ge=0, le=360)
    fixed_commitments: List[TimeWindow]
    priority_goals: List[str]

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "LYF-Sync Core"}

@app.post("/api/plan")
async def generate_weekly_plan(prefs: UserPreferences):
    # Validates boundaries before passing bounded slots to Gemini
    return {"status": "success", "schedule": []}`
          }
        ],
        outcome:
          "Produced a working end-to-end scheduling tool that successfully validates input parameters, respects physical commute limits, and renders weekly time-block structures on the React frontend.",
        limitations: [
          "No direct bi-directional synchronization with Google Calendar or Microsoft Outlook.",
          "No background autonomous rescheduling when meetings change dynamically; schedules are regenerated on demand."
        ],
        whatILearned:
          "Mastered prompt engineering with strict JSON output schemas, type-safe API engineering with FastAPI and Pydantic, and state management in complex multi-step React onboarding wizards."
      }
    },

    {
      slug: "cloudshield-iq",
      title: "CloudShield IQ",
      category: "Multi-Cloud Security Risk Assessment Platform",
      period: "2026 – Present (Final-Year Project)",
      role: "Lead Architect & Security Engineer",
      context: "Final-Year Engineering Project (In Active Development)",
      statusLabel: "In Development",
      githubUrl: "https://github.com/Praveenkumar-2006/Cloudshield-IQ",
      stack: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "React",
        "TypeScript",
        "Scikit-learn",
        "XGBoost",
        "SHAP",
        "Docker",
        "Playwright"
      ],
      summary:
        "A multi-cloud security assessment platform combining deterministic rules, Isolation Forest anomaly detection, and XGBoost risk scoring with TreeSHAP explainability across multi-cloud audit logs.",
      concreteEvidence:
        "Normalized telemetry parser (CloudTrail, Azure activity, GCP audit) to common event schema; rule-based compliance engine supporting CIS Benchmarks, NIST SP 800-53, ISO/IEC 27001, and PCI DSS; automated Playwright test suite.",
      caseStudy: {
        overview:
          "CloudShield IQ is a security risk assessment platform designed to normalize disparate telemetry logs from AWS, Azure, and Google Cloud, evaluate compliance against major industry standards, and classify security risk using a hybrid architecture of deterministic rule engines and explainable machine learning models.",
        problemAndContext:
          "Multi-cloud architectures generate massive, inconsistently formatted audit streams (AWS CloudTrail, Azure Activity Logs, GCP Cloud Audit). Security teams struggle with alert fatigue from disconnected rule engines that flag issues without risk prioritization or explainability.",
        whatIDid:
          "I built the data validation and normalization pipeline to map disparate logs into a unified event format, designed the deterministic compliance rule engine covering six major standards, implemented an Isolation Forest model for baseline anomaly detection, trained an XGBoost classifier for severity scoring, generated TreeSHAP explanations for each prediction, and built the React/TypeScript dashboard containerized via Docker.",
        constraints: [
          "Evaluations currently execute against sample, synthetic, and uploaded telemetry batches; live IAM connection to active cloud provider accounts is pending.",
          "Machine learning models require deterministic fallback: critical misconfigurations (e.g., world-readable S3 buckets or open SSH ports) must trigger immediate critical flags regardless of ML confidence scores."
        ],
        keyDecisions: [
          {
            decision: "Hybrid Architecture: Deterministic Rules + ML Classification",
            rationale: "Pure ML models can suffer false negatives on rare or zero-day misconfigurations, while pure rules cannot detect behavioral anomalies. Combining deterministic compliance evaluation with XGBoost classification ensures baseline regulatory guarantees while adapting to anomalous behavior.",
            alternativesConsidered: "Rule-only engine (fails to detect subtle behavioral drift) or ML-only engine (unacceptable lack of compliance auditability)."
          },
          {
            decision: "TreeSHAP for Model Explainability",
            rationale: "Security engineers reject black-box AI scores. TreeSHAP provides mathematically exact Shapley value attributions for every feature, pinpointing exactly why an event was categorized as High Risk (e.g., unauthorized geo-location + off-hours execution).",
            alternativesConsidered: "LIME (approximated, non-deterministic across runs) or raw model confidence scores (no explanation of underlying causal factors)."
          }
        ],
        implementationDetails: [
          "Engineered schema normalizers converting raw AWS CloudTrail JSON, Azure Activity Log JSON, and GCP Audit Log JSON into a standardized EventSchema (timestamp, principal, action, resource, source_ip, geo_country, status, raw_metadata).",
          "Implemented compliance checks and control evaluation logic against six major security frameworks: CIS AWS Foundations Benchmark, CIS Microsoft Azure Foundations Benchmark, CIS Google Cloud Platform Foundations Benchmark, NIST SP 800-53, ISO/IEC 27001, and PCI DSS.",
          "Integrated Scikit-learn's Isolation Forest to establish behavioral baselines and flag statistical outliers in access patterns.",
          "Trained an XGBoost model on structured telemetry features (action type, error rate, privilege level) to output calibrated risk probabilities (Low, Medium, High, Critical).",
          "Generated TreeSHAP force plots and feature importance summaries rendered directly in the React frontend.",
          "Containerized backend, database, and frontend services using Docker Compose; wrote automated end-to-end tests using Playwright."
        ],
        codeExcerpts: [
          {
            caption: "FIG. 03 | CloudShield IQ | Unified Event Normalization & Rule Engine Schema",
            language: "python",
            code: `from pydantic import BaseModel, IPvAnyAddress
from datetime import datetime
from typing import Dict, Any, Optional

class NormalizedCloudEvent(BaseModel):
    event_id: str
    provider: str  # "aws" | "azure" | "gcp"
    timestamp: datetime
    principal_id: str
    action: str
    resource_arn: str
    source_ip: str
    status: str    # "Success" | "Failure"
    risk_level: Optional[str] = "Pending"
    metadata: Dict[str, Any]

class ComplianceRuleEngine:
    """Evaluates normalized events against CIS, NIST, ISO, and PCI controls."""
    @staticmethod
    def evaluate_cis_aws_1_16(event: NormalizedCloudEvent) -> Dict[str, Any]:
        # CIS AWS: Ensure IAM policies that grant full '*:*' are not attached
        if event.action in ["CreatePolicy", "PutUserPolicy"]:
            statement = event.metadata.get("PolicyDocument", {}).get("Statement", [])
            for s in statement:
                if s.get("Effect") == "Allow" and s.get("Action") == "*":
                    return {
                        "control": "CIS-AWS-1.16",
                        "status": "FAIL",
                        "severity": "CRITICAL",
                        "remediation": "Restrict policy actions to least-privilege permissions."
                    }
        return {"control": "CIS-AWS-1.16", "status": "PASS"}`
          }
        ],
        outcome:
          "Demonstrated a verified, containerized pipeline capable of parsing multi-cloud log formats, evaluating compliance across 6 security standards, detecting behavioral anomalies, and delivering transparent SHAP-explained risk scores.",
        limitations: [
          "In Active Development: Live integration with cloud provider APIs (AWS IAM, Azure Resource Graph, GCP Cloud Asset) is pending.",
          "Telemetry currently evaluated against sample and synthetic benchmarks; no claims of real-time production deployment or enterprise security guarantees."
        ],
        whatILearned:
          "Deepened understanding of multi-cloud audit log structures, statistical anomaly detection, tree-based machine learning classification, explainable AI mathematical foundations, and end-to-end containerized testing with Playwright."
      }
    }
  ]
};

