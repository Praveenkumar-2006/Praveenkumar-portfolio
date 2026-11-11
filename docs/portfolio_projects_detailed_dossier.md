# Portfolio Project Dossier

**Prepared for:** Praveenkumar P  
**Purpose:** Detailed source document for the three featured projects in the developer portfolio, resume updates, project case studies, and technical interviews.  
**Featured projects:** SkillBridge, LYF-Sync, and CloudShield IQ.

---

## How to use this document

This dossier combines two kinds of information:

1. **Resume information:** the project descriptions, technologies, dates, and responsibilities stated in the uploaded resume.
2. **Repository inspection:** features, folder structures, scripts, endpoints, UI components, and implementation details visible in the linked GitHub repositories.

These are not interchangeable. A feature described in a README or present in source code is evidence that the repository contains it; it does not, by itself, prove that every integration is deployed in a live environment or that a particular feature was independently completed by one person. Status and evidence limitations are called out where relevant.

## At-a-glance portfolio summary

| Project | Main area | Main technologies | Current positioning |
|---|---|---|---|
| SkillBridge | CRM application / placement workflow management | Zoho CRM, Deluge, CRM APIs, Zia, HTML, CSS, JavaScript, Zoho Embedded App SDK | Internship project |
| LYF-Sync | AI-assisted personal schedule planning | Python, FastAPI, Pydantic, React, Vite, Tailwind CSS, Google Gemini API | Personal full-stack project; resume date: April 2026 |
| CloudShield IQ | Multi-cloud security risk assessment and compliance | Python, FastAPI, PostgreSQL, React, TypeScript, scikit-learn, XGBoost, SHAP, Docker, Playwright | Final-year project; 2026–present in the resume; active development |

---

# 1. SkillBridge

## 1.1 Project identity

**Full title:** SkillBridge – CRM-Based Placement Management System  
**Type:** Zoho CRM-based placement management application  
**Context:** Zoho internship project  
**Resume technology list:** Zoho CRM, Deluge, CRM APIs, Zia  
**GitHub:** https://github.com/Praveenkumar-2006/SkillBridge

## 1.2 Project overview

SkillBridge is a placement management system built on Zoho CRM. It organizes placement-related records such as students, job openings, and applications, and connects those records through CRM modules and lookup relationships. The project uses Deluge custom functions and Zoho CRM APIs to support record operations and placement workflow logic.

The resume describes the application as covering student, job-opening, and application records. The repository also contains an embedded recruitment-suite interface with sections for the dashboard, job openings, applications, interviews, and students.

## 1.3 Problem addressed

Placement information is commonly distributed across student profiles, recruitment opportunities, applications, and interview rounds. These records need to remain connected so that placement staff can inspect a student's details, check an application's progress, and follow the recruitment process.

SkillBridge uses Zoho CRM modules and lookup fields to organize these related records in one CRM-based workflow.

## 1.4 Main entities and relationships

The repository's embedded widget reads the following CRM entities:

- **Students:** student identity and academic/profile information.
- **Job_Openings:** recruitment opportunities and job requirements.
- **Applications:** student applications linked to a student and a job opening.
- **Interviews:** interview rounds linked to an application.

The widget uses lookup relationships between applications, students, job openings, and interviews. The application-detail view uses those relationships to display the associated student, job, eligibility information, application stage, and interview history.

### Student information visible in the repository's Deluge functions

The Deluge functions reference fields including:

- Register number / student record name
- Full name
- Department
- CGPA
- Active backlogs
- Skills
- Email
- Phone
- Placement status

### Job-opening information referenced by eligibility logic

- Minimum CGPA
- Maximum backlogs
- Eligible departments
- Required skills

### Application information referenced by workflow logic

- Student lookup
- Job-opening lookup
- Register number
- Full name and contact information
- Eligibility status and eligibility reason
- Application stage
- Final result

### Interview information referenced by workflow logic

- Application lookup
- Interview round
- Interview status
- Interview date/time
- Interview mode
- Interviewer name

The exact fields available in a live Zoho CRM account depend on its module configuration. The list above reflects fields referenced by the checked-in code and the resume, not a claim that every field is mandatory in every deployment.

## 1.5 User-interface modules

The main embedded widget (`SkillBridge/app/widget.html`) presents a dark recruitment-suite dashboard and contains these views:

### Dashboard

- Placement overview for the current academic cycle.
- Total-student, eligible-application, active-interview, and placed-student KPI cards.
- Application pipeline summary.
- Upcoming interviews.
- Open job opportunities.
- Recent applications.

### Job Openings

- Displays open job opportunities.
- Shows job and company information.
- Displays package, number of openings, minimum CGPA, and required skills where the CRM record provides those fields.
- Provides a job-detail view.

### Applications

- Lists applications and associated student/job information.
- Displays eligibility, application stage, and final result.
- Supports searching applications by application, student, or job.
- Includes stage filters such as Applied, Assessment, Technical Interview, HR Interview, Offered, Rejected, and Placed.
- Opens an application-detail view.

### Application detail

- Shows the associated student and job opening.
- Displays an application progress timeline.
- Shows an eligibility breakdown, including CGPA, backlogs, department, and the recorded eligibility reason.
- Displays interview history related to that application.
- Provides an action to schedule an interview.

### Interview Center

- Lists interview records.
- Displays application, interview round, status, mode, date/time, and interviewer.
- Includes search and interview-status filters.
- Contains a schedule-interview modal with round, date, time, mode, and interviewer fields.

### Students

- Lists student records.
- Displays name, register number, department, CGPA, backlogs, skills, and placement status where present.
- Supports searching student records.

## 1.6 Deluge functions and workflow logic

The repository contains several Deluge scripts. These are important technical parts of the project and are useful to explain in a project demonstration.

### A. `create_or_link_student`

**Purpose:** Link an application to an existing student record, or create the student record if no matching student is found.

**Observed flow:**

1. Fetch the Application record using its application ID.
2. Read the register number from the application.
3. Search the Students module using the register number.
4. If a matching student exists, retrieve that student's record ID.
5. If no matching student exists, prepare student data from the application details.
6. Create a new Students record.
7. Update the Application's Student lookup with the student record ID.
8. Read the application again to verify that the student lookup is populated.

This helps avoid creating an entirely separate student record for every application when a matching student record is already present.

### B. `check_application_eligibility`

**Purpose:** Evaluate whether an application meets a job opening's eligibility requirements.

**Observed flow:**

1. Fetch the Application record.
2. Read the Student and Job Opening lookup fields.
3. Fetch the corresponding Student and Job Opening records.
4. Read student CGPA, active backlogs, department, and skills.
5. Read the job's minimum CGPA, maximum backlogs, eligible departments, and required skills.
6. Evaluate the available criteria and build an eligibility reason.
7. Update the Application with an eligibility status and reason.
8. The function includes email-notification logic for the eligible and not-eligible outcomes.

**Important distinction:** The resume specifically highlights CGPA comparison. The checked-in Deluge implementation also references active backlogs, department, and required skills. When describing this in a portfolio, mention those additional checks only in a way that matches the version actually demonstrated in the CRM environment.

### C. `create_interview`

**Purpose:** Create an interview record for an application based on its current application stage.

**Observed flow:**

- Fetch the Application record.
- Read its application stage.
- For the Technical Interview stage, prepare a Technical 1 interview record.
- For the HR Interview stage, prepare an HR interview record.
- Link the new Interview record to the Application and set its status to Scheduled.
- Skip creation for stages that do not require an interview.

### D. `process_interview_result`

**Purpose:** Update the application stage based on an interview result.

**Observed workflow rules:**

| Interview round | Result | Application stage / outcome |
|---|---|---|
| Technical 1 | Passed | Move to HR Interview |
| Technical 1 | Failed | Mark Rejected; final result Rejected |
| HR | Passed | Move to Offered; final result Selected |
| HR | Failed | Mark Rejected; final result Rejected |

The Deluge function updates the Applications record and requests workflow triggering for the update.

### E. `update_student_placement`

**Purpose:** Update the related Student record's Placement_Status to `Placed` using the Student lookup on the Application.

### F. `get_zia_analysis`

The repository includes a Deluge function for submitting a prompt and CRM context to a Zoho Zia Agent endpoint and returning the response text.

**Scope clarification:** Zia usage in this project is limited to read-only retrieval/analysis of CRM information. Do not describe Zia as performing CRM record creation, updates, or other write operations. CRM record operations are handled separately through the Zoho CRM/Deluge workflow logic.

## 1.7 CRM API and widget integration

The embedded widget uses the Zoho Embedded App JavaScript SDK (`ZOHO.CRM.API`) to communicate with CRM records.

The inspected widget code contains helper operations for:

- Retrieving records from a CRM entity.
- Inserting a CRM record.
- Updating a CRM record.
- Refreshing Student, Application, Job Opening, and Interview data.

The UI refreshes its local state from CRM data and then redraws the dashboard, job list, applications, interviews, and student table.

The repository also contains a small Node.js/Express development server for serving the Zoho extension/widget files over HTTPS. This helper server should not be confused with a separate application backend that owns the placement data; the CRM is the data platform used by the widget.

## 1.8 Technology breakdown

| Technology | Role in the project |
|---|---|
| Zoho CRM | CRM data platform and record modules |
| Deluge | Custom functions and placement workflow logic |
| Zoho CRM APIs | Search, retrieve, create, and update CRM records |
| Zoho Embedded App SDK | Connects the embedded widget to Zoho CRM |
| HTML | Widget structure |
| CSS | Dashboard and module styling |
| JavaScript | UI rendering, search/filter behavior, CRM API calls, and view navigation |
| Node.js / Express | Local HTTPS development server for serving the extension/widget files |
| Zia | Read-only retrieval/analysis of CRM information |

## 1.9 Repository structure highlights

Relevant paths in the repository include:

```text
SkillBridge/
├── SkillBridge/
│   ├── app/
│   │   └── widget.html
│   ├── package.json
│   └── server/
│       └── index.js
├── SkillBridgeReports/
│   └── app/widget.html
├── SkillBridgeZIA/
│   └── app/
│       ├── css/style.css
│       └── js/main.js
├── SkillBridgeZiaAnalyst/
│   └── app/
│       ├── css/style.css
│       ├── js/main.js
│       └── widget.html
├── SkillBridge_UI_Widget/
│   └── app/widget.html
├── deluge functions/
│   ├── Create or Link Student
│   ├── Get Zia Analysis
│   ├── check_application_eligibility
│   ├── create_intereview
│   ├── process_interview_result
│   └── update_student_placement
├── SkillBridge_Widget_2_Zia_AI_Analyst_Specification.pdf
└── SkillBridge_Zoho_CRM_Master_Documentation_UPDATED.pdf
```

The repository contains multiple widget and Zia-related variants. For the public portfolio, choose the final version that you actually demonstrated and avoid presenting every experimental/alternate folder as a separately completed product.

## 1.10 Portfolio-ready project description

**SkillBridge is a Zoho CRM-based placement management system that organizes student profiles, job openings, applications, and interview records. I configured CRM modules and lookup relationships, built Deluge functions for student linking and application eligibility checks, and connected an embedded JavaScript dashboard to Zoho CRM APIs. The system includes application-stage tracking and interview workflow logic. Zia is used only for read-only retrieval and analysis of CRM information.**

## 1.11 Suggested live demo sequence

1. Open the SkillBridge embedded dashboard.
2. Show the placement KPI cards and application pipeline.
3. Open Job Openings and show the job requirement fields.
4. Open Students and show the student profile fields.
5. Open an Application and explain the Student and Job Opening lookups.
6. Demonstrate the eligibility result and explain the criteria used by the Deluge function.
7. Show the application timeline and related interview history.
8. Demonstrate interview scheduling or show the Deluge function responsible for creating interview records.
9. Explain how interview outcomes can update the application stage.
10. Explain that Zia only retrieves/analyzes information and does not write CRM records.

## 1.12 Interview explanation

**30-second version:**

"SkillBridge is a placement management system I developed using Zoho CRM during my internship. I structured student, job-opening, application, and interview records using CRM modules and lookup fields. I wrote Deluge functions for linking applications to students, checking eligibility against job requirements, and supporting interview-stage updates. I also built an embedded dashboard that reads and works with CRM records through the Zoho APIs. Zia was limited to read-only information retrieval."

**Technical topics to be ready to explain:**

- CRM modules and lookup relationships.
- Difference between a CRM record ID and a lookup field.
- How Deluge fetches records and reads fields.
- How the eligibility function handles missing Student or Job Opening lookups.
- How application criteria are compared with job requirements.
- How the application is linked to an existing or newly created student.
- How interview round/status values drive stage changes.
- How the embedded widget retrieves and refreshes CRM records.
- What Zia did and, equally importantly, what it did not do.

## 1.13 Accuracy notes and claims to avoid

- Do not call this a standalone React/Node/MongoDB placement platform. The inspected repository is a Zoho CRM extension/widget project, and the CRM stores the placement records.
- Do not say Zia creates or updates CRM records. Its usage is read-only.
- Do not claim AI-based automated placement decisions. The inspected eligibility logic is Deluge business logic comparing record fields.
- Do not claim a deployed public production service unless you have a live demo URL and can demonstrate it.
- The repository contains alternative widget folders and specification/documentation PDFs. Identify the actual final version before using screenshots in the portfolio.

---

# 2. LYF-Sync

## 2.1 Project identity

**Full title:** LYF-Sync – AI-Powered Schedule Planner  
**Type:** Full-stack AI-assisted personal schedule planning application  
**Resume date:** April 2026  
**Resume technology list:** Python, FastAPI, React, Vite, Tailwind CSS, Google Gemini API, Pydantic  
**GitHub:** https://github.com/Praveenkumar-2006/LYF-Sync

The repository README uses the name **LifeSync** in its prose, while the GitHub repository name and resume branding use **LYF-Sync**. Use **LYF-Sync** consistently as the portfolio project name.

## 2.2 Project overview

LYF-Sync turns a user's routine, preferences, goals, fixed commitments, and available time into a structured daily and weekly plan. It combines a React frontend, a Python/FastAPI backend, scheduling logic, Pydantic data models, and Google Gemini API-based plan generation.

The application is designed to produce a one-week plan. The user provides schedule information through an onboarding flow, the backend stores the profile, the planner prepares a date-aware prompt, and the generated weekly plan is shown in an interactive dashboard.

## 2.3 Problem addressed

People often have to balance goals, hobbies, recurring obligations, commuting, and rest without a clear view of how much free time is actually available. LYF-Sync collects those constraints and uses scheduling logic plus AI-assisted generation to create a structured plan.

The project's key idea is not simply to generate a list of tasks. It is to account for the user's time windows and constraints when generating the week.

## 2.4 Main user inputs

The React onboarding form and Python scheduling engine reference the following types of information:

### Daily routine

- Wake-up time.
- Sleep time.
- Weekly schedule by day.
- Work/college start and end times when applicable.
- Available/free time windows.

### Goals

Each goal can include:

- Goal name.
- Weekly hours target.
- Priority.

### Hobbies / flexible activities

Each hobby can include:

- Hobby name.
- Weekly hours target.
- Flexibility information.

### Rigid commitments

A rigid block can include:

- Activity name.
- Start time.
- End time.
- Days of the week on which it occurs.

### Commute and preparation

The profile structure includes:

- Preparation time in minutes.
- Travel/commute time in minutes.

### Planning preferences

The planner also uses preferences such as:

- Energy preference (morning, evening, or no preference).
- Preferred session length (short, medium, or long).
- Additional context such as an upcoming exam, holiday, or other scheduling note.

Not every field is necessarily exposed in the same way in every frontend revision. The list reflects the inspected input form, scheduling engine, and planner structures.

## 2.5 High-level architecture

```text
User
  |
  v
React + Vite onboarding form
  |
  | POST /api/profile
  v
FastAPI server
  |
  +--> Save user_profile.json
  |
  +--> Run planner.py
          |
          +--> Read and validate profile/configuration
          +--> Build seven-day date spine
          +--> Calculate / preserve time constraints
          +--> Build structured prompt
          +--> Call Google Gemini API
          +--> Parse structured plan with Pydantic models
          +--> Apply date spine and save weekly plan JSON
  |
  v
GET /api/plan
  |
  v
React dashboard displays weekly plan
```

## 2.6 Backend components

### A. `engine.py` – profile and time-window collection

The engine contains the logic for collecting and validating the user's routine and constraints. Its functions include time parsing/formatting helpers and free-slot calculations.

The inspected file contains methods for collecting:

- Fixed commitments/anchors.
- Commute information.
- Sleep and wake times.
- Goals.
- Hobbies and rigid blocks.

It calculates free time around fixed commitments and validates time inputs and schedule blocks before creating the profile data.

### B. `planner.py` – weekly plan generation

The planner is the core plan-generation component.

It:

1. Loads the user's profile.
2. Collects or selects the sprint configuration.
3. Chooses a start date and derives a seven-day date range.
4. Builds an explicit date spine containing each date and its real weekday name.
5. Builds a prompt from the user's weekly schedule, commute, rigid commitments, goals, hobbies, and preferences.
6. Calls Google Gemini 2.5 Flash when an API key is available.
7. Parses the model output into structured Pydantic objects.
8. Applies the date spine to the generated plan and writes the resulting plan data.

### C. Date spine

The planner computes the dates and day names in Python instead of asking the AI model to invent calendar dates. The `build_date_spine` function generates seven consecutive dates and their corresponding weekday names. The plan is then aligned to those exact values.

This is an important implementation detail because it reduces date/day mismatch errors in a week-long plan.

### D. Pydantic plan models

The planner defines structured models including:

- `ExerciseItem`
- `PracticeItem`
- `TaskBlock`
- `DayPlan`
- `WeeklyMilestone`
- `OneWeekPlan`

A task block contains fields such as start time, end time, task name, category, goal reference, notes, and optional exercise/practice information. A day plan contains a date, weekday name, tasks, and a day summary. The weekly plan contains a title, sprint start/end, milestones, daily plans, and general advice.

### E. Scheduling constraints in the planner prompt

The planner prompt contains hard rules intended to keep the generated schedule valid. Examples include:

- Do not place tasks inside locked work/school windows.
- Keep tasks inside the free windows for the relevant date.
- Preserve rigid blocks rather than moving or overlapping them.
- Keep tasks within wake/sleep bounds.
- Use exact `HH:MM` time strings.
- Include a rest block for each day.

These are rules included in the planning prompt. They should not be presented as a formal guarantee that every possible AI-generated plan is always constraint-perfect unless the app has been tested against those cases.

### F. `server.py` – FastAPI API layer

The FastAPI service connects the frontend and the Python planner. The inspected code defines these endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/plan` | Return the generated one-week plan JSON |
| GET | `/api/profile` | Return the stored user profile JSON |
| POST | `/api/profile` | Save submitted profile data and run `planner.py` to generate a new plan |
| GET | `/api/health` | Return a simple API health status |

The profile submission endpoint writes `user_profile.json`, launches the planner as a subprocess, and returns an error if the planner fails.

### G. Persistence

The inspected version uses JSON files such as:

- `user_profile.json`
- `one_week_plan.json`

The README describes these as profile and generated-plan storage. No MongoDB or PostgreSQL database is listed as part of this repository's current architecture.

## 2.7 Frontend components

The frontend is built with React and Vite and styled with Tailwind CSS.

### Onboarding form (`InputForm.jsx`)

The form gathers routine and planning information, including wake/sleep times, goals, hobbies, and rigid blocks. It builds a profile object and submits it to the backend through the frontend API service.

### API service (`services/api.js`)

The frontend service provides functions for:

- Fetching the weekly plan.
- Fetching the user profile.
- Submitting the profile to generate a new plan.
- Checking backend health.

### Dashboard (`Dashboard.jsx`)

The dashboard fetches the generated weekly plan and displays:

- Weekly milestones/goals.
- Daily task blocks.
- Start and end times.
- Task categories such as goal, hobby, rest, rigid/work, nutrition, and self-care.
- Goal-day summaries and plan information.
- Additional task detail such as exercises when those are included in the plan.

### Login component

The repository includes a `Login.jsx` component. The presence of this component in the source tree should not be expanded into claims about production-grade authentication, authorization, account management, or secure identity infrastructure without separately verifying those features.

## 2.8 AI integration

The planner uses the Google Gen AI Python client and calls the `gemini-2.5-flash` model in the inspected code.

The AI is used to generate a structured weekly plan based on the schedule profile, selected goals, constraints, and contextual preferences. Pydantic models are used to represent the expected output structure.

The code also contains a fallback path that can produce a mock plan when `GEMINI_API_KEY` is not configured. This is useful for development/testing, but a mock fallback should not be described as a real Gemini-generated plan.

## 2.9 Technology breakdown

| Technology | Role in the project |
|---|---|
| Python | Profile engine, scheduling logic, planner pipeline |
| FastAPI | Backend REST API |
| Pydantic | Structured validation and plan data models |
| Google Gemini API | AI-assisted weekly plan generation |
| React | Interactive frontend |
| Vite | Frontend development/build tooling |
| Tailwind CSS | UI styling |
| JavaScript | Frontend behavior and API requests |
| Framer Motion | Animation dependency in frontend package |
| Lucide React | Icon components in frontend package |
| Recharts | Charting dependency in frontend package |
| JSON | Profile and generated-plan persistence in the inspected implementation |
| Uvicorn | ASGI server for FastAPI |
| python-dotenv | Environment-variable loading |

## 2.10 Repository structure highlights

```text
LYF-Sync/
├── README.md
├── backend/
│   ├── engine.py
│   ├── main.py
│   ├── planner.py
│   ├── server.py
│   └── requirements.txt
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx
        ├── components/
        │   ├── Dashboard.jsx
        │   ├── InputForm.jsx
        │   └── Login.jsx
        └── services/
            └── api.js
```

## 2.11 Local run instructions from the repository README

### Backend

```bash
cd backend
# Activate a virtual environment first
pip install -r requirements.txt
python server.py
```

The README states that the API server runs at `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The README states that the Vite development server runs at `http://localhost:5173`.

A Gemini API key is needed for real Gemini generation. The planner contains a mock-plan fallback for testing when the key is absent.

## 2.12 Portfolio-ready project description

**LYF-Sync is a full-stack AI-assisted schedule planner that turns a user's routines, goals, preferences, fixed commitments, and time constraints into a personalized weekly plan. I built the React and Vite onboarding flow and dashboard, developed the Python/FastAPI backend, implemented scheduling and date-handling logic, and integrated Google Gemini API for structured plan generation. Pydantic models validate the profile and weekly-plan structures, while JSON files store the profile and generated plan.**

## 2.13 Suggested live demo sequence

1. Open the application and show the onboarding flow.
2. Enter wake-up and sleep times.
3. Add one or more goals with weekly-hour targets and priorities.
4. Add flexible hobbies.
5. Add a rigid commitment on selected days.
6. Explain how work/college windows, free slots, and commute time affect the available schedule.
7. Submit the profile and show the backend plan-generation flow.
8. Show the generated weekly plan in the dashboard.
9. Open a day and explain the task categories, time blocks, and goal references.
10. Explain how the date spine keeps the generated week aligned with actual calendar dates.
11. Explain the Gemini API integration and the mock fallback used when no API key is configured.

## 2.14 Interview explanation

**30-second version:**

"LYF-Sync is an AI-assisted weekly scheduling application. Users enter their wake/sleep times, goals, hobbies, fixed commitments, and preferences through a React onboarding flow. A FastAPI backend stores the profile and runs a Python planning pipeline. The planner calculates a seven-day date spine, builds a constraint-aware prompt, and uses Google Gemini to generate a structured weekly plan. Pydantic models validate the plan, and the React dashboard displays the generated schedule."

**Technical topics to be ready to explain:**

- Why the project has a separate profile engine and planner.
- How free time is calculated around fixed commitments.
- How rigid blocks differ from flexible tasks.
- How commute/preparation time affects available time.
- Why a date spine is generated in Python.
- Why Pydantic models are used for the AI output.
- How FastAPI launches the planner after profile submission.
- How JSON persistence works in the inspected implementation.
- What happens when the Gemini key is missing or the response cannot be parsed.
- How the frontend fetches and displays the generated plan.

## 2.15 Accuracy notes and claims to avoid

- The inspected implementation stores profile/plan data in JSON files; do not claim MongoDB or PostgreSQL persistence.
- Do not describe the mock fallback plan as a Gemini-generated result.
- Do not claim the generated schedule is guaranteed conflict-free in every case. The planner prompt contains constraint rules, but those should be validated through testing.
- The repository includes a Login component, but its presence alone does not establish production authentication.
- The README says the frontend is React + Vite + Tailwind CSS. Keep that as the core stack; list additional frontend dependencies only as supporting libraries.

---

# 3. CloudShield IQ

## 3.1 Project identity

**Full title:** CloudShield IQ – Multi-Cloud Security Risk Assessment Platform  
**Formal title in repository README:** AI-Based Multi-Cloud Security Risk Assessment and Compliance Monitoring Framework  
**Type:** Final-year Information Technology project  
**Resume date:** 2026–present  
**Resume technology list:** Python, FastAPI, PostgreSQL, React, TypeScript, scikit-learn, XGBoost, SHAP, Docker  
**GitHub:** https://github.com/Praveenkumar-2006/Cloudshield-IQ

## 3.2 Project overview

CloudShield IQ is a software platform for assessing cloud security posture across multi-cloud environments. Its architecture combines security telemetry ingestion and normalization, deterministic security rules, machine-learning-based anomaly detection and risk classification, compliance control evaluation, explainability, remediation recommendations, and a centralized dashboard.

The project separates responsibilities:

- **Machine learning:** identifies anomalous behavior and estimates risk/severity.
- **Deterministic rules:** applies defined security checks and guardrails.
- **Compliance engine:** evaluates telemetry against configured compliance controls.
- **SHAP:** explains feature contributions behind ML predictions.
- **Optional LLM:** produces human-readable explanations from verified evidence; it is not the primary risk decision-maker.

## 3.3 Problem addressed

Cloud environments produce large volumes of security and audit events. These logs can be difficult to compare across providers because each provider uses different event names, resource models, and field structures. Security teams also need to understand which events are risky, which controls may be violated, why a model produced a risk result, and what remediation steps are appropriate.

CloudShield IQ aims to bring these tasks into one workflow by normalizing telemetry, assessing risk, evaluating controls, explaining findings, and presenting recommendations in a dashboard.

## 3.4 High-level architecture

```text
Cloud security telemetry
(AWS / Azure / GCP exports, CSV, JSON, sample datasets)
                |
                v
        Ingestion API
                |
                v
    Validation + Normalization
                |
                v
       Canonical security events
                |
        +-------+--------+
        |                |
        v                v
  Rule-based risk    ML risk assessment
     engine          - Isolation Forest
        |            - XGBoost classifier
        |                |
        +-------+--------+
                |
                v
       Security findings / scores
                |
       +--------+---------+
       |                  |
       v                  v
 Compliance engine    TreeSHAP explainability
       |                  |
       +--------+---------+
                |
                v
       Remediation recommendations
                |
                v
       FastAPI + PostgreSQL
                |
                v
       React + TypeScript dashboard
```

This is the repository's intended/implemented software architecture at a high level. It should not be represented as live, always-on AWS/Azure/GCP account monitoring: the README marks direct cloud integrations as pending.

## 3.5 Data sources and ingestion

The repository includes an ingestion pipeline designed to accept cloud security telemetry in CSV and JSON formats.

Inspected ingestion routes support:

- Uploading CSV or JSON telemetry files.
- Ingesting batches of JSON event records.
- Loading sample datasets by type.
- Retrieving ingestion statistics.
- Listing ingested events.
- Listing findings generated from ingested telemetry.

Sample dataset types referenced by the API include:

- Synthetic security telemetry.
- AWS CloudTrail-style data.
- Azure activity data.
- GCP audit data.
- A multi-stage attack scenario.

The repository contains sample/synthetic dataset files for AWS CloudTrail, Azure activity, GCP audit, and a multi-stage attack scenario. The pipeline normalizes incoming records into a common security-event structure before evaluation.

### Important live-integration boundary

The README marks AWS live integration as pending and Azure/GCP live integrations as pending or conditional on scope. Therefore:

- It is accurate to say the project supports ingestion/processing of cloud-provider-format or sample telemetry.
- Do not say that the project currently connects to and continuously monitors live AWS, Azure, and GCP accounts unless those integrations have since been completed and demonstrated.

## 3.6 Normalization and canonical event model

The repository includes a taxonomy and normalization pipeline to map provider-specific event details into a standard representation.

Why this matters:

- AWS, Azure, and GCP use different action names and resource terminology.
- A unified event format makes it possible to reuse downstream feature extraction, risk rules, and ML models.
- Common fields make provider-specific and cross-provider analysis more consistent.

The code includes a provider/action taxonomy and a telemetry normalization service. The ingestion pipeline parses CSV/JSON data, processes raw records, evaluates normalized events, and builds risk/finding summaries.

## 3.7 Risk assessment engine

The repository uses a hybrid approach rather than relying on one ML model.

### A. Deterministic rule-based risk engine

The rule engine applies explicit heuristic/security rules to normalized cloud events. It provides deterministic guardrails for known risky actions or configurations.

The ingestion pipeline evaluates normalized event batches using the rule-based engine and produces assessment results and security findings.

### B. Isolation Forest anomaly detection

The project includes an `IsolationForestAnomalyDetector` based on scikit-learn.

Its role is to identify events that are statistically unusual relative to the training data. The implementation includes model fitting, prediction, anomaly-score calibration, event/batch prediction, and model save/load functionality.

### C. XGBoost supervised risk classification

The project includes a supervised risk classifier using XGBoost.

The code describes a dual-output approach for:

- Predicting a categorical severity level.
- Predicting a continuous risk score on a 0–100 scale.

The classifier includes fitting, prediction, metadata, model serialization, and loading functionality.

### D. Hybrid assessment service

`RiskAssessmentService` coordinates the rule-based engine, Isolation Forest detector, supervised risk classifier, and SHAP explainer. It exposes methods for event/batch assessment, anomaly detection, risk classification, model information, retraining, and explanations.

## 3.8 SHAP explainability

The repository includes a TreeSHAP explanation component.

Its purpose is to make ML outputs easier to interpret by identifying which event features contribute to a prediction. The code includes:

- Local explanation for one event.
- Batch explanations for multiple events.
- Global feature-attribution rankings.

The dashboard can use risk-driver and feature-impact information to explain why a finding received its model-generated risk assessment.

## 3.9 Compliance assessment engine

The repository includes a deterministic compliance engine and a catalog of compliance controls.

The compliance API provides operations to:

- List supported frameworks.
- List registered compliance controls.
- Filter controls by framework/provider where supported.
- Retrieve evaluated compliance status against current telemetry.
- Evaluate a batch of normalized security events.
- Generate compliance audit reports.

The checked-in compliance catalog identifies controls associated with frameworks/benchmarks including:

- CIS cloud foundations benchmarks for AWS, Azure, and GCP.
- NIST 800-53.
- ISO 27001.
- PCI-DSS 4.0.

The API returns statuses such as PASS, FAIL, and PARTIAL and calculates summary information. These are software evaluations against the controls and the telemetry made available to the application; do not claim formal certification or an external compliance audit.

## 3.10 Recommendation and remediation engine

The repository contains a remediation playbook catalog and recommendation engine.

The recommendation API supports:

- Listing remediation playbooks.
- Retrieving an individual playbook.
- Generating context-aware recommendations.
- Prioritizing a batch of security findings.
- Simulating remediation posture impact.
- Retrieving playbook statistics.

The catalog includes examples covering areas such as:

- IAM and privileged access.
- Multi-factor authentication.
- Public cloud storage access.
- Audit logging.
- Key management.
- Network security rules.
- Service-account keys.

A playbook can include remediation steps, commands or code, verification guidance, and rollback information. These are recommendations/playbooks; do not claim that the platform automatically executes fixes against a customer's cloud account unless that action is separately implemented and authorized.

## 3.11 Grounded LLM explanation layer

The repository includes an optional LLM explanation service.

Its documented design is to turn already-verified ML, SHAP, compliance, and telemetry evidence into human-readable explanations. The service contains:

- Evidence-pack construction and sanitization.
- Deterministic explanation fallback.
- Optional external LLM invocation when configured.
- Grounding checks that reject explanations that contradict verified severity or invent unsupported identifiers/control references.

The repository explicitly states that the LLM must not invent findings, modify compliance determinations, or alter final risk scores. This architecture keeps the risk decision path separate from natural-language explanation.

## 3.12 API areas

The central FastAPI router includes the following feature areas:

| API area | Main purpose |
|---|---|
| Health | Service health and readiness checks |
| Ingestion | Upload, parse, normalize, and ingest telemetry; query ingestion data and statistics |
| ML | Run anomaly detection, supervised risk classification, model information, retraining, and SHAP explanations |
| Compliance | List frameworks/controls and evaluate compliance against events |
| Recommendations | Retrieve playbooks, generate recommendations, prioritize findings, and simulate remediation impact |
| Findings | Retrieve and update security finding records/status |

The API is mounted under `/api/v1` in the application. The main FastAPI application also exposes health routes and development API documentation when enabled by configuration.

## 3.13 Frontend dashboard

The inspected React/TypeScript dashboard contains these main areas:

### Overview

The overview is the main security posture view and is used to refresh dashboard data and show current project state.

### Findings

- Displays security findings.
- Supports finding selection and status updates.
- Uses finding information to display risk details and supporting explanations.

### Compliance

- Displays compliance evaluations and summary values.
- Supports filtering by compliance status and framework.
- Includes compliance report export functionality.

### ML Engine

- Shows model information.
- Supports triggering risk scans and viewing supervised risk predictions.
- Includes explainability-related dashboard state.

### Ingestion

- Supports telemetry ingestion workflows.
- Displays ingestion results and statistics.

### Architecture

- Provides an architecture-oriented view of the platform.

The frontend repository uses React 19, TypeScript, Vite, and Lucide React. It also contains Playwright end-to-end test specifications for major workflows.

## 3.14 Database and persistence

The backend project dependencies and source tree show:

- PostgreSQL as the relational database.
- SQLAlchemy 2.x for database access/ORM.
- asyncpg for asynchronous PostgreSQL connections.
- Alembic for database migrations.
- Repository classes for persistence and retrieval of application records such as events, findings, assessments, and compliance data.

The ingestion pipeline also includes in-memory storage/cache behavior to support dashboard behavior in offline/development scenarios. Therefore, distinguish persistent database operation from in-memory/offline fallback behavior when explaining the architecture.

## 3.15 Security and application configuration

The repository's backend dependencies/configuration include:

- Argon2 password hashing libraries.
- JWT-related libraries.
- Pydantic settings/configuration.
- CORS configuration.
- File-upload validation and limits in ingestion endpoints.
- Environment-variable configuration through an example `.env` file.

These are capabilities and configuration components present in the repository. Do not describe the application as independently security-certified or production-hardened without a separate security assessment.

## 3.16 Testing and deployment

### Testing

The repository includes:

- Python unit tests for API endpoints, schemas, rules, ML components, compliance, and recommendation logic.
- Python integration tests for repositories.
- Playwright end-to-end tests for frontend workflows such as navigation, findings, compliance, explainability, ingestion, and the ML engine.

The presence of tests does not prove all tests currently pass in every environment. Quote test results only after running the current test suite.

### Containerization and deployment files

The repository contains:

- Backend Dockerfiles.
- Frontend Dockerfiles.
- Docker Compose configurations for development and production.
- Nginx configuration.
- Deployment scripts for Windows and shell environments.
- A GitHub Actions CI workflow.

The README includes local Docker-based development and production-mode instructions. A checked-in deployment configuration is not the same as proof of an externally hosted production deployment.

## 3.17 Technology breakdown

| Technology | Role in the project |
|---|---|
| Python 3.11+ | Backend, normalization, risk/compliance services |
| FastAPI | REST API layer |
| Pydantic v2 | Input/output schemas and validation |
| PostgreSQL | Persistent relational storage |
| SQLAlchemy 2.x | ORM/database access |
| Alembic | Database migrations |
| scikit-learn | Isolation Forest anomaly detection and supporting ML utilities |
| XGBoost | Supervised risk/severity classification |
| SHAP / TreeSHAP | Local/global model explainability |
| pandas / NumPy | Dataset processing and numerical feature handling |
| React | Dashboard UI |
| TypeScript | Frontend application code and type checking |
| Vite | Frontend development/build tooling |
| Lucide React | UI icons |
| Docker / Docker Compose | Containerization and multi-service orchestration |
| Nginx | Reverse-proxy/gateway configuration |
| Playwright | Frontend end-to-end testing |
| GitHub Actions | CI workflow configuration |

## 3.18 Repository structure highlights

```text
Cloudshield-IQ/
├── README.md
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/
│   │   │   ├── compliance.py
│   │   │   ├── findings.py
│   │   │   ├── health.py
│   │   │   ├── ingestion.py
│   │   │   ├── ml.py
│   │   │   └── recommendations.py
│   │   ├── compliance/
│   │   │   ├── controls/
│   │   │   └── engines/
│   │   ├── core/
│   │   ├── ml/
│   │   │   ├── explainability/
│   │   │   ├── features/
│   │   │   ├── models/
│   │   │   └── rules/
│   │   ├── models/
│   │   ├── recommendations/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   └── services/
│   ├── alembic/
│   ├── ml/models/
│   ├── pyproject.toml
│   └── Dockerfile
├── datasets/
│   ├── profiles/
│   └── synthetic/
├── deployment/
│   ├── docker/
│   ├── nginx/
│   └── scripts/
├── docs/
│   ├── decisions/
│   └── documentation.md
├── frontend/
│   ├── e2e/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── index.css
│   └── package.json
├── ml/
│   ├── models/
│   └── scripts/
├── research/
└── tests/
    ├── integration/
    └── unit/
```

## 3.19 Project status and implementation boundaries

The README marks the project as actively developing and explicitly warns that features listed in its overview may reflect the design target rather than the current implementation state.

The checked-in phase table reports the following broad status:

- Environment setup and project skeleton: done.
- Dataset discovery/profiling and common schema: done.
- Rule-based risk engine: done.
- ML anomaly detection and supervised classification: done.
- SHAP explainability: done.
- Compliance and recommendation engines: done.
- FastAPI integration and PostgreSQL integration: done.
- React dashboard: done.
- Testing and Dockerization: done.
- AWS live integration: pending.
- Azure/GCP live integration: pending or conditional on scope.
- Documentation and final evaluation: in progress.

Treat this status table as the README's recorded status. Re-check the current branch and working demo before describing the project as complete.

## 3.20 Evaluation artifact and metric caution

The repository contains a saved evaluation report for a model run. That JSON artifact reports:

- Dataset rows: 25,000.
- Feature count: 75.
- Precision: 0.4192.
- Recall: 0.4192.
- F1 score: 0.4192.
- ROC-AUC: 0.7723.

These are values from one checked-in evaluation artifact, not a guarantee of production detection quality. The repository's research/architecture notes also discuss dataset generation/profile counts at other stages, so do not quote a dataset size without identifying the exact experiment/report it came from. The precision/recall/F1 values are modest and should not be presented as near-perfect model performance.

## 3.21 Portfolio-ready project description

**CloudShield IQ is a multi-cloud security risk assessment and compliance monitoring platform. I developed a telemetry pipeline that validates and normalizes cloud security events, combines deterministic security rules with Isolation Forest anomaly detection and XGBoost risk classification, and uses TreeSHAP to explain model outputs. The platform evaluates defined compliance controls, generates remediation guidance through a recommendation engine, and exposes the services through FastAPI with PostgreSQL persistence. A React and TypeScript dashboard presents findings, compliance results, ML insights, and ingestion workflows. The project is actively being developed; direct live-cloud integrations are still subject to the repository's pending implementation phases.**

## 3.22 Suggested live demo sequence

1. Open the CloudShield IQ dashboard and show the main overview.
2. Open Ingestion and upload or load one of the repository's supported sample datasets.
3. Explain parsing and normalization into the canonical event model.
4. Show generated findings and explain the risk fields.
5. Open the ML Engine and explain Isolation Forest versus supervised XGBoost classification.
6. Show a SHAP explanation and identify the main contributing features.
7. Open Compliance and show framework/control evaluations.
8. Open Recommendations and explain how a finding can be mapped to a remediation playbook.
9. Show the API documentation or relevant FastAPI routes.
10. Explain PostgreSQL/SQLAlchemy persistence and Docker-based local deployment.
11. Clearly state that sample telemetry ingestion is implemented while live provider integrations remain pending unless your current demo proves otherwise.

## 3.23 Interview explanation

**30-second version:**

"CloudShield IQ is my final-year project for multi-cloud security risk assessment and compliance monitoring. It ingests cloud security telemetry, normalizes events into a common schema, and evaluates them using a rule-based engine, Isolation Forest anomaly detection, and XGBoost risk classification. TreeSHAP helps explain model predictions, while a separate compliance engine evaluates security controls and a recommendation engine provides remediation guidance. I built the FastAPI backend and React/TypeScript dashboard with PostgreSQL persistence and Docker-based service configuration."

**Technical topics to be ready to explain:**

- Why cloud-provider event normalization is needed.
- What a canonical event schema contains.
- Difference between rule-based detection and anomaly detection.
- What Isolation Forest does and why it is useful for unusual events.
- What XGBoost predicts in this project.
- Difference between classification severity and a continuous risk score.
- What TreeSHAP explains and how local explanations differ from global feature importance.
- How deterministic compliance checks differ from ML risk predictions.
- How a remediation playbook is selected and prioritized.
- Why an LLM is restricted to explaining verified evidence rather than setting the risk score.
- How FastAPI endpoints are separated by feature area.
- How SQLAlchemy and Alembic support database persistence and schema changes.
- What is currently supported with sample data versus live cloud account integrations.

## 3.24 Accuracy notes and claims to avoid

- Do not claim continuous/live monitoring of AWS, Azure, and GCP. The README marks direct integrations as pending.
- Do not claim formal certification for CIS, NIST, ISO, or PCI-DSS. The platform evaluates configured controls; it does not certify an organization.
- Do not claim that the LLM decides risk severity or changes compliance results. The code explicitly constrains it to grounded explanations.
- Do not claim remediation commands are automatically executed against cloud accounts. The repository supports recommendations/playbooks and simulations; automatic live execution is not established by the inspected material.
- Do not quote evaluation metrics without giving context. The checked-in report's precision, recall, and F1 are 0.4192, with ROC-AUC 0.7723.
- Do not claim every test currently passes unless you run the current test suite and retain its output.
- Do not claim a public production deployment solely because Docker/Nginx/deployment files exist.

---

# 4. How the three projects complement each other

Together, the projects show three different types of software engineering work:

| Dimension | SkillBridge | LYF-Sync | CloudShield IQ |
|---|---|---|---|
| Main domain | CRM / placement workflow | AI-assisted productivity | Cloud security / compliance |
| Main backend logic | Deluge workflows and CRM APIs | Python scheduling pipeline | FastAPI services and risk/compliance engines |
| Frontend | Embedded JavaScript CRM widget | React onboarding and weekly-plan dashboard | React + TypeScript security dashboard |
| Data model | Students, jobs, applications, interviews | User profile, goals, fixed blocks, weekly plan | Security events, findings, assessments, controls |
| AI/ML role | Zia read-only retrieval/analysis only | Gemini-generated schedule suggestions | Isolation Forest, XGBoost, SHAP; optional grounded LLM explanations |
| Main engineering theme | Business process and record relationships | Scheduling under user constraints | Multi-stage telemetry and risk analysis pipeline |

### Recommended portfolio ordering

1. **CloudShield IQ** – strongest technical depth across backend, data pipelines, ML, explainability, compliance, database, testing, and deployment configuration.
2. **LYF-Sync** – clear full-stack product story with a user-facing workflow and AI integration.
3. **SkillBridge** – demonstrates CRM configuration, business workflow logic, Deluge scripting, and enterprise application integration from the internship.

This is a suggested portfolio order, not a ranking of personal achievement.

---

# 5. Cross-project skills demonstrated

Based on the resume and inspected repositories, the projects collectively demonstrate exposure to:

## Backend and API development

- FastAPI route design and request/response models.
- Node.js/Express local server setup.
- REST API integration.
- Pydantic validation.
- Zoho CRM API operations.
- Error handling and debugging.

## Frontend development

- React components and state-driven dashboards.
- React + Vite project structure.
- TypeScript in CloudShield IQ.
- HTML, CSS, and JavaScript embedded CRM UI.
- Search, filters, tables, navigation, modals, and status indicators.

## Data and persistence

- CRM modules and lookup relationships.
- JSON profile and generated-plan files.
- PostgreSQL with SQLAlchemy and Alembic.
- MongoDB is listed in the resume's general skill set, but it is not part of the three selected project architectures described in this dossier.

## AI and machine learning

- Google Gemini API for schedule generation.
- Isolation Forest for anomaly detection.
- XGBoost for supervised risk/severity prediction.
- SHAP/TreeSHAP for ML explainability.
- Grounded LLM explanations as a separate layer from risk decisions.
- Zia for read-only CRM information retrieval/analysis in SkillBridge.

## Engineering practices and tools

- Git and GitHub.
- Docker and Docker Compose.
- Playwright end-to-end test definitions.
- Unit/integration test structure.
- Environment variables and `.env.example` configuration.
- Debugging through execution logs and API errors.

---

# 6. Important wording and consistency rules for the portfolio

1. Always spell the project name **LYF-Sync**. The repository README also uses “LifeSync” in its prose, but the resume/repository branding is LYF-Sync.
2. Use **CloudShield IQ** as the display name, while preserving the GitHub repository URL casing: `Cloudshield-IQ`.
3. Describe SkillBridge as a **Zoho CRM-based placement management system**, not as a conventional standalone MERN/MEAN application.
4. State explicitly that **Zia is read-only** in SkillBridge.
5. Describe LYF-Sync as **AI-assisted schedule generation**. Explain the user constraints, scheduling engine, date spine, and Gemini integration rather than presenting it as a generic chatbot.
6. Describe CloudShield IQ as **active development** unless a current release/demo confirms completion.
7. Separate **sample telemetry support** from **live cloud-account integration** in CloudShield IQ.
8. Separate **remediation recommendations** from **automatic remediation execution**.
9. Do not invent user counts, performance improvements, accuracy percentages, uptime, deployment URLs, customer usage, or business impact metrics. Add quantified results only when you have measured evidence.
10. For every project, keep the portfolio description, GitHub README, screenshots, demo, and interview explanation consistent with the actual version being shown.

---

# 7. Repository links

- SkillBridge: https://github.com/Praveenkumar-2006/SkillBridge
- LYF-Sync: https://github.com/Praveenkumar-2006/LYF-Sync
- CloudShield IQ: https://github.com/Praveenkumar-2006/Cloudshield-IQ

# 8. Source basis and limitations

This dossier is based on:

- The uploaded one-page resume `zoho_resume_praveen.pdf`.
- The public `README.md` files and selected source files in the three GitHub repositories linked above.
- Repository folder/file listings and implementation details visible at the time of inspection.

No local application execution, end-to-end live CRM demonstration, live Gemini request, cloud-account integration test, production security audit, or full test-suite run was performed as part of preparing this document. Descriptions of deployed/live behavior should therefore be confirmed against a running demo before publication.
