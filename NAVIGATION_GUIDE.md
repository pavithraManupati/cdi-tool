# Navigation Structure by Role

## 📋 CDI Specialist Navigation
```
┌─────────────────────────┐
│       CDI Tool          │
├─────────────────────────┤
│   [CDI Specialist]      │ 🔵 Blue chip
├─────────────────────────┤
│ 📊 Dashboard            │
│ 💬 All Queries          │
│ ➕ New Query            │
└─────────────────────────┘
```
**Access:**
- ✅ Dashboard (organization-wide metrics)
- ✅ All Queries (view, edit, manage)
- ✅ New Query (create new queries)

---

## 👨‍⚕️ Physician Navigation
```
┌─────────────────────────┐
│       CDI Tool          │
├─────────────────────────┤
│   [Physician]           │ 🟣 Purple chip
├─────────────────────────┤
│ 📊 Dashboard            │
│ 💬 All Queries          │
└─────────────────────────┘
```
**Access:**
- ✅ Dashboard (personal queries only)
- ✅ All Queries (view and respond)
- ❌ New Query (hidden - physicians don't create queries)

---

## 👨‍💼 Clinical Coder Navigation
```
┌─────────────────────────┐
│    Coding Workspace     │ ← Different title!
├─────────────────────────┤
│  [Clinical Coder]       │ 🟢 Green chip
├─────────────────────────┤
│ 📊 Dashboard            │
└─────────────────────────┘
```
**Access:**
- ✅ Dashboard (AI-powered coding workspace)
- ❌ All Queries (hidden - not relevant to coders)
- ❌ New Query (hidden - not relevant to coders)

**Note:** The header title changes from "Query Management System" to "Coding Workspace" for coders!

---

## 🎯 Key Changes for Clinical Coder

### What Coders SEE:
✅ Dashboard with patient cases table
✅ AI-generated codes (Dx, CPT, DRG)
✅ Code selection interface
✅ Revenue calculations
✅ Export/Submit buttons

### What Coders DON'T SEE:
❌ Query-related navigation
❌ "All Queries" tab
❌ "New Query" tab
❌ Query creation forms
❌ Query assignment features

---

## 🔄 Role-Based Menu Logic

```typescript
// Menu items are filtered by role
const menuItems = [
  { 
    text: 'Dashboard', 
    roles: ['CDI Specialist', 'Physician', 'Clinical Coder'] 
  },
  { 
    text: 'All Queries', 
    roles: ['CDI Specialist', 'Physician'] 
    // ❌ Clinical Coder excluded
  },
  { 
    text: 'New Query', 
    roles: ['CDI Specialist'] 
    // ❌ Physician and Clinical Coder excluded
  }
]
```

---

## 💡 Design Rationale

### Why hide queries from coders?
1. **Different workflow**: Coders work with cases/patients, not queries
2. **Focus**: Eliminates confusion and distractions
3. **Efficiency**: Direct access to coding tasks
4. **Role clarity**: Clear separation of responsibilities
5. **UI cleanliness**: Simpler, more intuitive interface

### Workflow Comparison:

**CDI Specialist:**
Dashboard → All Queries → Create Query → Assign → Track

**Physician:**
Dashboard → All Queries → Select Query → Respond

**Clinical Coder:**
Dashboard → Select Case → Review AI Codes → Select Codes → Submit

Each role has a streamlined interface for their specific tasks!
