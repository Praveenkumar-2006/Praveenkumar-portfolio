# Portfolio Project Asset Checklist

**Asset Destination Directory:** `/public/assets/screens/`  
**Rendering Rule:** The `Plate` / preview component renders **only** if the asset file exists on disk. If an asset is not yet supplied, no placeholder or fabricated image will be rendered; the portfolio will fall back to real formatted code excerpts or text-only figures with `FIG. 0X` captions.

---

## 1. SkillBridge (CRM Placement Management System)

All captures must be taken from the Zoho CRM environment or verified script editor.

| Asset Filename | What the Capture Must Show | Target Viewport / Resolution | Status |
|---|---|---|---|
| `skillbridge-crm-relationships.png` | Zoho CRM Setup / Module Customization showing lookup relationships linking `Students`, `Job_Openings`, and `Applications`. | Desktop (1440x900 or 1280x800) | **Pending User Capture** |
| `skillbridge-pipeline-dashboard.png` | Zoho CRM dashboard showing Application Pipeline (Applied, Under Review, Shortlisted, Placed) and KPI summary. | Desktop (1440x900 or 1280x800) | **Pending User Capture** |
| `skillbridge-interview-center.png` | Zoho CRM Interview management view showing interview rounds, scheduling, mode, and results tracking. | Desktop (1440x900) | **Pending User Capture** |
| `skillbridge-student-view.png` | Student profile detail record displaying academic metrics (CGPA, department, active backlogs, skills) and application status. | Desktop (1440x900) | **Pending User Capture** |
| `skillbridge-deluge-eligibility.png` | Zoho Deluge script editor showing the custom function evaluating student CGPA, backlogs, department, and skills against job requirements. | Desktop / Code View (1280x720) | **Alternative:** Can render real Deluge code snippet |

---

## 2. LYF-Sync (AI-Powered Schedule Planner)

Captures from the running frontend (`localhost:5173`) and API endpoint.

| Asset Filename | What the Capture Must Show | Target Viewport / Resolution | Status |
|---|---|---|---|
| `lyf-sync-onboarding.png` | The multi-step React onboarding form capturing user daily routines, fixed commitments, and commute times. | Desktop (1280x800) or Tablet (768x1024) | **Pending User Capture** |
| `lyf-sync-weekly-dashboard.png` | Interactive React weekly calendar/timeline view showing allocated time blocks generated via Gemini API assistance. | Desktop (1440x900) | **Pending User Capture** |
| `lyf-sync-api-health.png` | Browser or Postman/terminal capture showing the exact JSON payload returned from `GET /api/health` (`{"status": "healthy"}`). | 800x600 (or terminal output excerpt) | **Alternative:** Can render verifiable JSON text block |

---

## 3. CloudShield IQ (Multi-Cloud Security Risk Assessment Platform)

Captures from the React/TypeScript frontend and test runner execution.

| Asset Filename | What the Capture Must Show | Target Viewport / Resolution | Status |
|---|---|---|---|
| `cloudshield-dashboard.png` | Central risk assessment dashboard showing multi-cloud normalized risk scores and rule-engine flags. | Desktop (1440x900) | **Pending User Capture** |
| `cloudshield-shap-explanation.png` | SHAP feature contribution visualization (TreeSHAP summary/waterfall plot explaining model risk classification factors). | Desktop (1280x800) | **Pending User Capture** |
| `cloudshield-compliance-results.png` | Compliance evaluation view showing CIS Foundations Benchmark controls status and control catalogue references. | Desktop (1440x900) | **Pending User Capture** |
| `cloudshield-playwright-run.png` | Terminal console or Playwright HTML test report showing executed end-to-end frontend workflow test pass results. | Terminal / Desktop (1280x720) | **Alternative:** Can render real Playwright test run output block |

---

## 4. Personal Assets

| Asset Filename | Path | Status |
|---|---|---|
| Profile Photo | `/public/assets/profile.jpg` | **Available** (Verified: PraveenKumar P on motorbike, outdoor setting. To be cropped as unadorned 4:5 or 1:1 rectangle with WebP & JPEG fallbacks). |
| Open Graph Image | `/public/assets/og-image.png` | **To be generated** (1200x630, cobalt flat accent `#2440D8`, crisp typography with name, title, and profile crop, zero gradients). |

