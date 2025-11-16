# Patient Coding Workflow

## Overview
The clinical coder workflow has been enhanced with a dedicated patient coding page that opens when a case is selected. This provides a focused workspace for each patient with manual input capabilities for AI code generation.

## Workflow Steps

### 1. Dashboard View (CoderDashboard)
- **Location**: `/dashboard` (for coders)
- **Features**:
  - View all patient cases in a table format
  - Quick stats: Total Cases, Cases Coded Today, Avg AI Confidence, Revenue Today
  - Case information: Patient Name, MRN, Admission/Discharge Dates, Status, AI Confidence
  - Click any row or "Code Patient" button to open detailed coding page

### 2. Patient Coding Page (PatientCoding)
- **Location**: `/patient/:patientId`
- **Features**:
  - **Patient Header**: Shows patient name, MRN, admission/discharge dates
  - **Back Button**: Return to dashboard
  - **Manual Input Section**: Toggle to show/hide clinical detail form

## Manual Input for AI Code Generation

### When to Use Manual Input
- Initial AI codes need refinement
- Additional clinical information available
- Documentation was incomplete during first AI analysis
- Coder needs to add context for more accurate coding

### Input Fields Available

#### Basic Clinical Information

##### 1. Chief Complaint / Presenting Problem
- **Purpose**: Document the main reason for the patient visit
- **Example**: "Patient presents with chest pain and shortness of breath..."
- **Impact**: Helps AI identify primary diagnosis codes

##### 2. Clinical Notes / History  
- **Purpose**: Comprehensive clinical documentation
- **Example**: "Patient has history of hypertension, diabetes. Current symptoms include..."
- **Impact**: Provides context for comorbidities and complications

##### 3. Procedures Performed
- **Purpose**: List all procedures during the encounter
- **Example**: "Echocardiogram, Chest X-ray, Blood work..."
- **Impact**: Directly influences CPT code suggestions

##### 4. Lab Results / Findings
- **Purpose**: Document diagnostic test results
- **Example**: "BNP: 850, Ejection Fraction: 35%, WBC: 15,000..."
- **Impact**: Helps determine severity and specificity of diagnosis codes

#### DRG Weight & Severity Factors

##### 5. Comorbidities / Pre-existing Conditions
- **Purpose**: Document existing conditions that complicate care
- **Example**: "Diabetes with complications, CHF, COPD, CKD Stage 3..."
- **Impact**: Major Complication/Comorbidity (MCC) can significantly increase DRG weight (0.5-2.0+ increase)
- **Coding Note**: Comorbidities must be documented as treated/affecting care

##### 6. Complications During Stay
- **Purpose**: New conditions that developed during hospitalization
- **Example**: "Acute respiratory failure, sepsis, acute kidney injury..."
- **Impact**: Can shift to higher-weighted DRG category; MCCs add substantial weight
- **Coding Note**: Must be clearly documented as present on admission (POA) or hospital-acquired

##### 7. Mechanical Ventilation
- **Purpose**: Duration and type of ventilator support
- **Example**: "96+ hours, <96 hours, or None"
- **Impact**: Major DRG determinant; 96+ hours can shift to much higher DRG weight
- **Coding Note**: Exact hours documented determine DRG (e.g., DRG 207 vs 208)

##### 8. Length of Stay (Days)
- **Purpose**: Total days from admission to discharge
- **Example**: "5" days
- **Impact**: Extended LOS may indicate higher severity; used in outlier payment calculations
- **Coding Note**: LOS beyond geometric mean triggers outlier review

##### 9. Discharge Disposition
- **Purpose**: Patient's discharge destination
- **Example**: "Home, SNF (Skilled Nursing Facility), LTAC, Expired"
- **Impact**: Discharge to facility suggests higher complexity and resource use
- **Coding Note**: Home health vs SNF vs LTAC indicates different care needs

##### 10. Severe Illness Indicators
- **Purpose**: Critical care interventions and ICU-level treatments
- **Example**: "ICU admission, pressors, dialysis, transfusions, shock..."
- **Impact**: These interventions dramatically increase severity score and DRG weight
- **Coding Note**: 
  - ICU admission alone can increase weight
  - Vasoactive medications = shock coding opportunity
  - Dialysis for AKI significantly impacts DRG
  - Blood transfusions indicate acute blood loss/anemia severity

### How to Generate Codes from Manual Input

1. **Click "Add Clinical Details" button** in the patient coding page header
2. **Fill in any combination of the 4 input fields** with relevant clinical information
3. **Click "Generate Codes from Input"** button at the bottom of the form
4. **AI processes the information** and regenerates:
   - Diagnosis Codes (ICD-10) with updated confidence levels
   - CPT Codes with revised selections
   - DRG Suggestions with recalculated weights and scores

### Code Regeneration Process

When you click "Generate Codes from Input":
- ✅ AI analyzes the new clinical information
- ✅ Combines with existing patient data
- ✅ Updates code confidence levels based on documentation
- ✅ May add new codes that weren't previously suggested
- ✅ May remove codes that are no longer supported
- ✅ Recalculates DRG weights and expected reimbursement

## Code Selection Interface

### Diagnosis Codes Tab
- **View**: Table with ICD-10 codes, descriptions, categories
- **Select**: Check boxes to select codes for billing
- **Confidence**: Visual progress bar showing AI confidence (0-100%)
- **Category**: Primary, Secondary, Complication, etc.

### CPT Codes Tab
- **View**: Procedure codes with descriptions and units
- **Select**: Check boxes for procedures to bill
- **Units**: Number of times procedure was performed
- **Confidence**: AI confidence in code applicability

### DRG Suggestions Tab
- **View**: DRG options with weights, scores, and revenue
- **Select**: Radio button (only one DRG can be selected)
- **Weight**: DRG relative weight for reimbursement
- **Score**: AI calculated appropriateness score
- **Revenue**: Expected reimbursement amount

## Action Buttons

### Export Codes
- **Enabled**: When at least one code is selected
- **Function**: Download selected codes to CSV/Excel
- **Use Case**: External billing system integration

### Submit for Review
- **Enabled**: When diagnosis codes AND DRG are selected
- **Function**: Submit coded case to billing/review team
- **Result**: Case marked as "Coded" in dashboard

## Best Practices

### 1. Start with AI Suggestions
- Review the initial AI-generated codes first
- Check confidence levels (aim for >75%)
- Verify against patient documentation

### 2. Add Manual Input When Needed
- Low confidence codes (<75%) may need more context
- Missing procedures should be added manually
- Complex cases benefit from detailed clinical notes

### 3. Review Before Submission
- Ensure primary diagnosis is selected
- Verify all procedures are coded
- Check DRG makes sense for case
- Confirm expected revenue is reasonable

### 4. Use Regenerate Sparingly
- Only regenerate when significant new information is added
- Each regeneration may change code selections
- Review changes carefully after regeneration

## Navigation

### From Dashboard
- Click any patient row to open coding page
- Or click "Code Patient" button on the right

### From Coding Page
- Click back arrow icon to return to dashboard
- Use browser back button (not recommended)

## Understanding DRG Weight Impact

### What is DRG Weight?
- **Definition**: Relative resource consumption for a patient group
- **Base Weight**: 1.0000 = average Medicare case
- **Higher Weight**: More resources/costs = higher reimbursement
- **Example**: DRG weight 2.5 = 2.5x the base payment rate

### Factors That Increase DRG Weight

#### Major Impact (Can increase weight by 0.5-3.0+)
1. **Major Complications/Comorbidities (MCC)**
   - Examples: Acute respiratory failure, sepsis with organ dysfunction, acute MI
   - Can shift from CC to MCC DRG (e.g., DRG 291 → 189)

2. **Mechanical Ventilation 96+ Hours**
   - Tracheostomy with ventilation = highest weight
   - Can shift to DRG in 200s with weight 3.0-6.0+

3. **Multiple Organ Failure**
   - Respiratory + renal + cardiac = highest severity
   - Activates multiple MCCs

4. **Critical Care Interventions**
   - CRRT (continuous dialysis)
   - ECMO
   - Intra-aortic balloon pump
   - Multiple vasoactive medications

#### Moderate Impact (Can increase weight by 0.2-0.8)
1. **Complications/Comorbidities (CC)**
   - Examples: Controlled diabetes, uncomplicated CHF
   - Shifts from non-CC to CC DRG

2. **Surgical Complications**
   - Post-op infection, dehiscence
   - May shift to complication DRG

3. **Acute on Chronic Conditions**
   - Acute kidney injury on CKD
   - Acute on chronic respiratory failure

#### Minor Impact (May increase weight by 0.1-0.3)
1. **Extended Length of Stay**
   - Outlier payments kick in beyond threshold
   - Usually at 2-3x geometric mean LOS

2. **Multiple Secondary Diagnoses**
   - Even without CC/MCC designation
   - Shows complexity of care

### DRG Severity Score Determinants

The AI calculates severity scores (0-100) based on:

1. **Clinical Severity** (40% weight)
   - ICU admission
   - Vasoactive medications
   - Mechanical ventilation
   - Organ failure indicators

2. **Comorbidity Burden** (30% weight)
   - Number of chronic conditions
   - Severity of each condition
   - Impact on treatment

3. **Procedural Complexity** (20% weight)
   - Number of procedures
   - Invasiveness level
   - Complications from procedures

4. **Resource Utilization** (10% weight)
   - Length of stay
   - Intensive care days
   - Consultants involved

### Optimizing DRG Capture

✅ **DO Document**:
- All conditions treated or affecting care
- Exact ventilation hours
- All critical care interventions
- Present on admission status
- Specificity (e.g., "CHF with reduced EF" not just "CHF")

❌ **DON'T**:
- Code conditions not documented
- Assume comorbidities without documentation
- Code "rule out" diagnoses
- Miss acute-on-chronic opportunities

## Tips for Accurate Coding

1. **Document Everything**: More clinical details = better AI accuracy
2. **Be Specific**: Detailed lab results help with specificity
3. **Include Timeframes**: Acute vs chronic conditions affect coding
4. **Review Confidence**: Always check why AI is confident/uncertain
5. **Validate Revenue**: If expected revenue seems off, review DRG selection
6. **Check for MCCs**: Look for opportunities to add major complicating conditions
7. **Verify Ventilation Hours**: 96-hour threshold is critical for DRG assignment
8. **Document Severity**: ICU days, pressors, dialysis all impact weight
9. **Capture Complications**: Hospital-acquired conditions can increase DRG weight
10. **Review Discharge Disposition**: Reflects complexity and resource needs

## Demo Patient Cases

### John Smith (MRN: 12345)
- **Condition**: Heart Failure with Acute Decompensation
- **Suggested Use**: Example of complex cardiac case with multiple diagnoses

### Mary Johnson (MRN: 67890)
- **Condition**: Community-Acquired Pneumonia with Sepsis
- **Suggested Use**: Example of infection with systemic complication

### Linda Wilson (MRN: 11223)
- **Condition**: Acute Kidney Injury on CKD
- **Suggested Use**: Example of acute-on-chronic condition

## Future Enhancements

- [ ] Real-time AI API integration (currently mock data)
- [ ] Code search functionality
- [ ] Documentation attachment upload
- [ ] Coding history/audit trail
- [ ] Collaboration with CDI specialists
- [ ] Automated DRG optimization suggestions
- [ ] Machine learning from coder selections
- [ ] Integration with EHR systems
