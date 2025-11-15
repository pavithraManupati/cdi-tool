# CDI Query Management System - README

## Overview
A comprehensive Clinical Documentation Improvement (CDI) Query Management System designed to help doctors and clinical coders improve documentation quality, streamline query management, and optimize revenue.

## Features

### ✅ Implemented in Mockup

1. **Dashboard**
   - Real-time statistics and metrics
   - Query status distribution (pie chart)
   - Query types analysis (bar chart)
   - High-priority query list
   - Performance metrics tracking
   - Revenue impact overview

2. **Query Management**
   - Complete CRUD operations
   - Advanced filtering (status, priority, type)
   - Smart search functionality
   - Sortable table view
   - Pagination support
   - Revenue impact tracking per query

3. **Query Detail View**
   - Full query information display
   - Patient demographics
   - Clinical indicators
   - DRG analysis (current vs. potential)
   - Revenue opportunity calculation
   - Conversation thread
   - Response functionality
   - Status management
   - Assignment tracking
   - Quick actions sidebar

4. **Create Query Workflow**
   - Multi-step wizard interface
   - Template library (5 pre-built templates)
   - Patient information capture
   - Query details form
   - Clinical indicators management
   - Review before submission
   - Save as draft option

### 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Material Design**: Clean, professional interface using Material-UI
- **Color-Coded Status**: Visual indicators for priority and status
- **Interactive Charts**: Data visualization for insights
- **Role-Based Views**: Different interfaces for different user types
- **HIPAA-Compliant Design**: Secure information display

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **State Management**: React Hooks (useState)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Run

The application will start on `http://localhost:3000` and includes:
- Mock data for demonstration
- 5 sample queries with different statuses
- 5 query templates
- Sample user roles and assignments

## Project Structure

```
cdi-tool/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Main layout with navigation
│   ├── pages/
│   │   ├── Dashboard.tsx       # Dashboard with metrics
│   │   ├── QueryList.tsx       # Query management table
│   │   ├── QueryDetail.tsx     # Individual query view
│   │   └── CreateQuery.tsx     # Query creation wizard
│   ├── data/
│   │   └── mockData.ts         # Sample data for demo
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PROJECT_PLAN.md             # Detailed project plan
```

## Key Functionalities

### For Physicians
- View assigned queries
- Respond to CDI specialist queries
- Access clinical indicators
- View revenue impact
- Quick access to patient charts

### For Clinical Coders
- Create new queries with templates
- Assign queries to physicians
- Track query responses
- Monitor revenue opportunities
- Generate reports

### For CDI Specialists
- Full query management
- Documentation review
- Code validation
- Analytics and reporting
- Team performance tracking

## Mock Data Highlights

### Sample Queries
1. Heart Failure specificity query (High priority, Open)
2. Pneumonia organism documentation (Medium priority, Pending)
3. Sepsis clinical validation (Low priority, Resolved)
4. Acute Kidney Injury staging (Critical priority, Open)
5. Diabetes complications specificity (High priority, Escalated)

### Query Templates
1. Heart Failure Specificity
2. Pneumonia Organism Documentation
3. Sepsis Validation
4. Acute Kidney Injury Stage
5. Malnutrition Severity

## Next Steps for Production

1. **Backend Integration**
   - Set up REST API or GraphQL
   - Implement authentication (JWT/OAuth)
   - Database setup (PostgreSQL)
   - File upload service

2. **Enhanced Features**
   - Real-time notifications
   - Email integration
   - Document viewer
   - AI-powered code suggestions
   - Advanced analytics

3. **Security & Compliance**
   - HIPAA compliance audit
   - Encryption implementation
   - Audit logging
   - Role-based access control (RBAC)
   - Two-factor authentication

4. **Testing**
   - Unit tests (Jest/Vitest)
   - Integration tests
   - E2E tests (Playwright/Cypress)
   - Performance testing

5. **Deployment**
   - CI/CD pipeline setup
   - Cloud hosting (AWS/Azure)
   - Monitoring and logging
   - Backup strategy

## User Roles

- **Physician**: Responds to queries, views clinical data
- **Clinical Coder**: Creates queries, assigns codes
- **CDI Specialist**: Full access, documentation review
- **Administrator**: System management, user administration

## Support & Documentation

For questions or issues:
- Review the PROJECT_PLAN.md for detailed features
- Check the code comments for implementation details
- Mock data in `src/data/mockData.ts` shows data structure

## License

Proprietary - All rights reserved

---

**Note**: This is a mockup/prototype. All patient data is fictional and generated for demonstration purposes only.
