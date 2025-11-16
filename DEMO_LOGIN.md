# Demo Login Credentials

This CDI Tool has two different user roles with different dashboard views:

## 1. CDI Specialist View
**For Clinical Documentation Improvement specialists who create and manage queries**

- **Email:** `cdi@demo.com`
- **Password:** `cdi123`

### Features:
- Comprehensive overview of all queries across the organization
- Query type distribution and status analytics
- Revenue impact tracking
- Performance metrics (response time, resolution rate, documentation quality)
- High priority query management
- Query creation and assignment

---

## 2. Physician View
**For physicians who respond to clinical documentation queries**

- **Email:** `doctor@demo.com`
- **Password:** `doctor123`

### Features:
- Personal query dashboard showing only assigned queries
- Quick view of queries requiring response
- Overdue query tracking
- Personal response time trends
- Recent activity feed
- Simplified interface focused on responding to queries

---

## 3. Clinical Coder View (AI-Powered)
**For clinical coders who select and assign medical codes using AI assistance**

- **Email:** `coder@demo.com`
- **Password:** `coder123`

### Features:
- **Focused Coding Interface:**
  - No query-related tabs (queries not relevant to coders)
  - Only "Dashboard" navigation visible
  - Clean workspace focused on coding tasks
- **Patient Cases Table:**
  - View all cases ready for coding
  - See status, dates, and AI confidence at a glance
  - Click any row to open dedicated patient coding page
- **Dedicated Patient Coding Page:**
  - Full-screen workspace for each patient
  - All code selection in one place
  - Patient demographics and dates at top
  - Back button to return to case list
- **Manual Input for AI Code Generation:**
  - **Basic Clinical Info:**
    - Chief complaint / Presenting problem
    - Clinical notes / History
    - Procedures performed
    - Lab results / Findings
  - **DRG Weight & Severity Factors:**
    - Comorbidities / Pre-existing conditions (MCC impact)
    - Complications during stay (can shift DRG)
    - Mechanical ventilation duration (96+ hrs critical)
    - Length of stay (outlier indicator)
    - Discharge disposition (complexity indicator)
    - Severe illness indicators (ICU, pressors, dialysis, etc.)
- **AI-Generated Code Suggestions:**
  - Diagnosis codes (ICD-10) with confidence scores (0-100%)
  - CPT codes with recommended units
  - DRG suggestions with weights, scores, and expected reimbursement
- **Interactive Code Selection:**
  - Select/deselect codes with checkboxes
  - View AI confidence levels for each code (color-coded)
  - Primary and secondary diagnosis categorization
- **DRG Analysis:**
  - Compare multiple DRG options
  - View DRG weights (relative resource consumption)
  - Review severity scores (0-100)
  - Calculate expected revenue based on selected DRG
- **AI Code Regeneration:**
  - Click "Generate Codes from Input" after adding clinical details
  - AI reanalyzes with new information
  - Updates code confidence levels
  - May add/remove codes based on documentation
- **Export & Submit:**
  - Export selected codes for billing
  - Submit coded cases for review

---

## Quick Start

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the application in your browser (usually http://localhost:5173)

3. You'll be redirected to the login page

4. Click on either "Login as CDI Specialist" or "Login as Physician" button for instant access

5. Alternatively, manually enter the credentials above

---

## Switching Between Views

To switch between different user views:

1. Click on your avatar in the top-right corner
2. Select "Logout" from the dropdown menu
3. Login with different credentials to see the alternate view

---

## Key Differences

| Feature | CDI Specialist | Physician | Clinical Coder |
|---------|---------------|-----------|----------------|
| Dashboard | Organization-wide metrics | Personal queries only | AI-Powered Coding |
| Query Tabs | ✅ All Queries + New Query | ✅ All Queries (view only) | ❌ Hidden (not relevant) |
| Query Creation | ✅ Can create | ❌ View only | ❌ Not visible |
| Analytics | Full analytics | Personal metrics | Code selection metrics |
| Query Response | ✅ Can view | ✅ Must respond | ❌ Not relevant |
| Revenue Impact | ✅ Full visibility | Limited visibility | DRG-based revenue |
| AI Features | ❌ Not available | ❌ Not available | ✅ Full AI assistance |
| Focus | Managing workflow | Responding to queries | Coding & billing only |

---

## Sample Queries

The application includes 5 mock queries demonstrating different:
- Query types (Specificity, Missing Documentation, Clarification, Clinical Validation)
- Priority levels (Low, Medium, High, Critical)
- Status states (Open, Pending, Resolved, Escalated)
- Clinical scenarios (Heart Failure, Pneumonia, Sepsis, AKI, Diabetes)

Explore these queries to see how the system handles different clinical documentation improvement scenarios.
