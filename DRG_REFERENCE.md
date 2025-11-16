# DRG Weight & Severity Quick Reference

## 🎯 Critical Factors for Maximum DRG Weight

### Top 10 DRG Weight Boosters

1. **Mechanical Ventilation ≥96 Hours** 
   - Impact: ⭐⭐⭐⭐⭐ (Can increase weight by 2.0-4.0)
   - Documentation Required: Exact intubation and extubation times
   - Example: DRG 291 (weight 1.2) → DRG 207 (weight 3.5)

2. **Sepsis with Organ Dysfunction (Severe Sepsis/Septic Shock)**
   - Impact: ⭐⭐⭐⭐⭐ (Adds 0.5-2.0 to weight)
   - Documentation Required: Sepsis + evidence of organ dysfunction
   - Keywords: Hypotension, lactate >2, pressors, altered mental status

3. **Acute Respiratory Failure**
   - Impact: ⭐⭐⭐⭐ (MCC - adds 0.5-1.5 to weight)
   - Documentation Required: PaO2/FiO2 ratio, clinical criteria
   - Note: More impactful than "respiratory distress"

4. **Acute Kidney Injury (AKI)**
   - Impact: ⭐⭐⭐⭐ (MCC - adds 0.4-1.2 to weight)
   - Documentation Required: Creatinine rise, stage (1-3)
   - Gold: AKI requiring dialysis (highest impact)

5. **Heart Failure with Major Complications**
   - Impact: ⭐⭐⭐⭐ (Adds 0.5-1.0 to weight)
   - Documentation Required: Acute decompensated, with MCC
   - Keywords: Cardiogenic shock, acute pulmonary edema

6. **Shock (Cardiogenic, Hypovolemic, Distributive)**
   - Impact: ⭐⭐⭐⭐⭐ (MCC - adds 0.8-1.5 to weight)
   - Documentation Required: Pressors, lactate, MAP <65
   - Note: Must document "shock" - not just hypotension

7. **Acute Myocardial Infarction (MI)**
   - Impact: ⭐⭐⭐⭐ (Base DRG weight 1.0-1.5)
   - Documentation Required: STEMI vs NSTEMI, troponin elevation
   - Enhanced by: Complications, PCI, CABG

8. **Diabetes with Complications**
   - Impact: ⭐⭐⭐ (CC/MCC - adds 0.2-0.5 to weight)
   - Documentation Required: Specify complication (neuropathy, retinopathy, nephropathy)
   - Note: Uncontrolled diabetes alone is not a CC

9. **Chronic Kidney Disease (CKD) Stage 4-5**
   - Impact: ⭐⭐⭐ (CC - adds 0.2-0.4 to weight)
   - Documentation Required: GFR <30 or on dialysis
   - Note: Must document stage, not just "CKD"

10. **Malnutrition (Severe)**
    - Impact: ⭐⭐⭐ (CC - adds 0.2-0.4 to weight)
    - Documentation Required: BMI, albumin, dietary intake
    - Keywords: Severe protein-calorie malnutrition

---

## 📊 DRG Category Examples

### Medical DRGs

| Condition | Base DRG | Weight (no CC) | Weight (with CC) | Weight (with MCC) |
|-----------|----------|----------------|------------------|-------------------|
| Heart Failure | 293 | 0.7 | 1.0 (DRG 292) | 1.4 (DRG 291) |
| Pneumonia | 195 | 0.7 | 0.9 (DRG 194) | 1.2 (DRG 193) |
| COPD | 192 | 0.7 | 0.9 (DRG 191) | 1.1 (DRG 190) |
| Sepsis | 872 | 0.8 | 1.3 (DRG 871) | 1.9 (DRG 870) |
| Kidney Infection | 690 | 0.6 | 0.8 (DRG 689) | 1.1 (DRG 698) |

### Surgical DRGs

| Procedure | Base DRG | Weight (no CC) | Weight (with CC) | Weight (with MCC) |
|-----------|----------|----------------|------------------|-------------------|
| Hip Replacement | 470 | 1.6 | 1.9 (DRG 469) | 2.3 (DRG 468) |
| CABG | 234 | 3.5 | 4.2 (DRG 233) | 5.8 (DRG 232) |
| Major Bowel Surgery | 330 | 1.8 | 2.5 (DRG 329) | 3.8 (DRG 328) |
| Tracheostomy | 004 | 6.8 | 8.2 (DRG 003) | 10.5 (DRG 003) |

---

## 🔍 CC vs MCC Quick Reference

### Major Complications/Comorbidities (MCC) - Highest Impact
- Acute respiratory failure
- Sepsis with organ dysfunction
- Acute myocardial infarction
- Shock (any type)
- Acute kidney failure requiring dialysis
- Acute kidney injury stage 2-3
- Ventilator dependency
- Liver failure
- Coma
- Hemorrhage with transfusion requirement

### Complications/Comorbidities (CC) - Moderate Impact
- COPD with acute exacerbation
- Diabetes with complications
- Chronic kidney disease stage 4-5
- Heart failure (uncomplicated)
- Morbid obesity (BMI >40)
- Protein-calorie malnutrition
- Anemia (if requiring transfusion)
- Atrial fibrillation
- History of MI
- Peripheral vascular disease

### Non-CC Conditions - No Additional Weight
- Hypertension (uncomplicated)
- Diabetes without complications
- Hypothyroidism
- Depression
- Anxiety
- GERD
- Osteoarthritis
- Simple UTI (no pyelonephritis)

---

## 💡 Documentation Tips for AI Coding

### Must-Have Documentation Elements

#### For Respiratory Conditions
```
✅ Good: "Acute hypoxemic respiratory failure, PaO2 55 on RA, requiring intubation at 14:30 on 10/15"
❌ Poor: "Respiratory distress"

DRG Impact: Good documentation = MCC (adds ~1.0 weight)
```

#### For Sepsis
```
✅ Good: "Septic shock secondary to pneumonia with acute kidney injury (Cr 3.2 from 1.0), requiring norepinephrine drip, lactate 4.5"
❌ Poor: "Infection with low BP"

DRG Impact: Good documentation = Multiple MCCs (adds ~2.0+ weight)
```

#### For Heart Failure
```
✅ Good: "Acute decompensated systolic heart failure with EF 25%, acute pulmonary edema requiring BiPAP, BNP 2850"
❌ Poor: "CHF exacerbation"

DRG Impact: Good documentation = MCC vs CC (difference of ~0.4 weight)
```

#### For Kidney Disease
```
✅ Good: "Acute kidney injury stage 3 (Cr 4.5 from baseline 1.2), requiring emergent hemodialysis"
❌ Poor: "Elevated creatinine"

DRG Impact: Good documentation = MCC (adds ~0.8 weight)
```

---

## 🚨 Red Flags: Don't Miss These DRG Opportunities

### High-Value Documentation Opportunities

1. **Ventilator Time Approaching 96 Hours**
   - Action: Document exact intubation time
   - Impact: Can double DRG weight
   - Threshold: 95 hours vs 96 hours = huge difference

2. **Patient on Multiple Pressors**
   - Action: Document as "shock" if criteria met
   - Impact: Adds MCC designation
   - Keywords: MAP <65, lactate >2, requiring pressors

3. **Rising Creatinine**
   - Action: Stage the AKI (1, 2, or 3)
   - Impact: Stage 2-3 = MCC
   - Document: Baseline Cr and current Cr

4. **Low Albumin + Poor Intake**
   - Action: Document as "severe protein-calorie malnutrition"
   - Impact: Adds CC
   - Evidence: Albumin <3.0, BMI <18.5, dietary intake <50%

5. **Blood Transfusion Given**
   - Action: Document "acute blood loss anemia" or reason
   - Impact: Can add CC/MCC depending on severity
   - Include: Hemoglobin drop, units transfused

6. **ICU Admission**
   - Action: Document reason (respiratory failure, shock, etc.)
   - Impact: The condition requiring ICU often = MCC
   - Note: ICU stay alone doesn't increase weight, but conditions do

7. **Patient Deteriorated During Stay**
   - Action: Document new complications vs admission conditions
   - Impact: Hospital-acquired conditions can shift DRG
   - Important: Present on Admission (POA) indicator

8. **Procedures Beyond Principal**
   - Action: Document all significant procedures
   - Impact: May shift to surgical DRG (higher weight)
   - Examples: Bronchoscopy, chest tube, dialysis catheter

---

## 📈 DRG Optimization Workflow

### Step 1: Identify Base DRG
- Principal diagnosis = base DRG category
- Example: Pneumonia → DRG 193-195 range

### Step 2: Look for MCCs
- Acute respiratory failure? ✓
- Sepsis? ✓
- AKI? ✓
- Shock? ✓

### Step 3: If No MCC, Look for CCs
- COPD? ✓
- Diabetes with complications? ✓
- CKD stage 4-5? ✓
- Morbid obesity? ✓

### Step 4: Check for Procedure Impact
- Any significant procedures?
- Could shift to surgical DRG?
- Tracheostomy? (Highest weight)

### Step 5: Validate LOS
- Is LOS appropriate for DRG?
- Unusually long? (May indicate missed complexity)
- Qualifies for outlier? (Usually 2-3x geometric mean)

### Step 6: Review Discharge Disposition
- Home vs SNF vs LTAC
- Reflects complexity and resource use
- Validates severity of illness

---

## 🎓 Quick Training Scenarios

### Scenario 1: The Ventilated Pneumonia Patient
**Given**: 
- 72-year-old with pneumonia
- Intubated for respiratory failure
- On ventilator 94 hours before extubation
- Went to SNF

**Question**: How to maximize DRG weight?
**Answer**: 
- Document acute respiratory failure (MCC) ✓
- Note if any complications (sepsis, AKI) ✓
- Unfortunately just missed 96-hour threshold
- DRG likely 193 (with MCC) weight ~1.2
- If vent was 96+ hours: DRG 207 weight ~3.5

### Scenario 2: The Heart Failure Patient
**Given**:
- 65-year-old with CHF exacerbation
- BNP 2500, pulmonary edema on X-ray
- Required BiPAP for acute respiratory distress
- Has diabetes and CKD stage 4

**Question**: What increases DRG weight?
**Answer**:
- Acute respiratory failure = MCC ✓ (if documented)
- Acute decompensated heart failure = base diagnosis
- Diabetes with complications = CC ✓
- CKD stage 4 = CC ✓
- Possible DRG 291 (with MCC) weight ~1.4 vs 293 (no CC) weight ~0.7

### Scenario 3: The Sepsis Patient
**Given**:
- 80-year-old with UTI source
- BP 80/50, requiring norepinephrine
- Lactate 4.2, altered mental status
- Creatinine rose from 1.0 to 3.5
- In ICU 4 days

**Question**: What's the optimal documentation?
**Answer**:
- Septic shock (MCC) ✓
- Acute kidney injury stage 3 (MCC) ✓
- Acute encephalopathy (MCC) ✓
- Multiple organ dysfunction
- Possible DRG 870 (sepsis with MCC) weight ~1.9

---

## 📞 Support Resources

### When to Consult CDI Specialist
- Complex cases with multiple comorbidities
- Unclear MCC vs CC designation
- DRG weight seems lower than expected
- Conflicting documentation

### AI Coding Confidence Thresholds
- **>90%**: High confidence, likely accurate
- **75-90%**: Good confidence, review for accuracy
- **60-75%**: Moderate confidence, verify against documentation
- **<60%**: Low confidence, manual review recommended

### Quick DRG Lookup Resources
- CMS DRG Definitions Manual
- MS-DRG Grouper Software
- ICD-10-CM/PCS Code Books
- Your facility's CDI team

---

## ✅ Pre-Submission Checklist

Before submitting coded case:

- [ ] Principal diagnosis is most resource-intensive condition
- [ ] All MCCs documented and coded
- [ ] All CCs documented and coded
- [ ] Ventilator hours accurate (if applicable)
- [ ] All procedures coded
- [ ] Present on Admission (POA) indicators correct
- [ ] Discharge disposition appropriate
- [ ] Expected revenue aligns with complexity
- [ ] DRG weight makes clinical sense
- [ ] Confidence scores reviewed

---

**Remember**: More specific documentation = Higher DRG weight = Better reimbursement

*Always code to the highest level of specificity supported by the medical record.*
