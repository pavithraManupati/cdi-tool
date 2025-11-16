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

| Feature | CDI Specialist | Physician |
|---------|---------------|-----------|
| Dashboard | Organization-wide metrics | Personal queries only |
| Query Creation | ✅ Can create | ❌ View only |
| Analytics | Full analytics | Personal metrics |
| Query Assignment | ✅ Can assign | ❌ Responds only |
| Revenue Impact | ✅ Full visibility | Limited visibility |
| Focus | Managing workflow | Responding to queries |

---

## Sample Queries

The application includes 5 mock queries demonstrating different:
- Query types (Specificity, Missing Documentation, Clarification, Clinical Validation)
- Priority levels (Low, Medium, High, Critical)
- Status states (Open, Pending, Resolved, Escalated)
- Clinical scenarios (Heart Failure, Pneumonia, Sepsis, AKI, Diabetes)

Explore these queries to see how the system handles different clinical documentation improvement scenarios.
