import { CodingSuggestion } from '../types'

// Mock AI-generated coding suggestions
export const aiCodingSuggestions: CodingSuggestion[] = [
  {
    patientId: 'PT-12345',
    patientName: 'John Smith',
    mrn: 'MRN-789456',
    admissionDate: '2024-11-10',
    dischargeDate: '2024-11-14',
    aiAnalysis: 'Patient admitted with acute decompensated heart failure with reduced ejection fraction (35%). Documentation supports acute systolic heart failure with evidence of pulmonary congestion and bilateral lower extremity edema. Consider secondary diagnosis codes for associated conditions.',
    generatedAt: '2024-11-14T10:30:00Z',
    diagnosisCodes: [
      {
        code: 'I50.21',
        description: 'Acute systolic (congestive) heart failure',
        confidence: 0.95,
        category: 'Primary',
        isSelected: false
      },
      {
        code: 'I11.0',
        description: 'Hypertensive heart disease with heart failure',
        confidence: 0.88,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'E11.9',
        description: 'Type 2 diabetes mellitus without complications',
        confidence: 0.82,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'I10',
        description: 'Essential (primary) hypertension',
        confidence: 0.91,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'E78.5',
        description: 'Hyperlipidemia, unspecified',
        confidence: 0.79,
        category: 'Secondary',
        isSelected: false
      }
    ],
    cptCodes: [
      {
        code: '99223',
        description: 'Initial hospital care, per day, high complexity',
        confidence: 0.93,
        units: 1,
        isSelected: false
      },
      {
        code: '93306',
        description: 'Echocardiography, transthoracic, real-time',
        confidence: 0.96,
        units: 1,
        isSelected: false
      },
      {
        code: '71046',
        description: 'Chest X-ray, 2 views',
        confidence: 0.89,
        units: 1,
        isSelected: false
      },
      {
        code: '99233',
        description: 'Subsequent hospital care, per day, high complexity',
        confidence: 0.91,
        units: 3,
        isSelected: false
      }
    ],
    drgSuggestions: [
      {
        code: '291',
        description: 'Heart Failure & Shock w MCC',
        weight: 1.3542,
        score: 95,
        confidence: 0.92,
        expectedReimbursement: 12500,
        isSelected: false
      },
      {
        code: '292',
        description: 'Heart Failure & Shock w CC',
        weight: 0.9234,
        score: 82,
        confidence: 0.78,
        expectedReimbursement: 8500,
        isSelected: false
      },
      {
        code: '293',
        description: 'Heart Failure & Shock w/o CC/MCC',
        weight: 0.6891,
        score: 65,
        confidence: 0.45,
        expectedReimbursement: 6300,
        isSelected: false
      }
    ]
  },
  {
    patientId: 'PT-12346',
    patientName: 'Mary Johnson',
    mrn: 'MRN-789457',
    admissionDate: '2024-11-08',
    dischargeDate: '2024-11-13',
    aiAnalysis: 'Patient diagnosed with community-acquired pneumonia based on chest X-ray findings and positive sputum culture. Culture identified Streptococcus pneumoniae. Clinical presentation includes productive cough, fever, and elevated WBC. Recommend specifying organism in diagnosis coding.',
    generatedAt: '2024-11-13T15:20:00Z',
    diagnosisCodes: [
      {
        code: 'J13',
        description: 'Pneumonia due to Streptococcus pneumoniae',
        confidence: 0.96,
        category: 'Primary',
        isSelected: false
      },
      {
        code: 'J96.01',
        description: 'Acute respiratory failure with hypoxia',
        confidence: 0.84,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'I10',
        description: 'Essential (primary) hypertension',
        confidence: 0.88,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'Z87.891',
        description: 'Personal history of nicotine dependence',
        confidence: 0.76,
        category: 'Secondary',
        isSelected: false
      }
    ],
    cptCodes: [
      {
        code: '99223',
        description: 'Initial hospital care, per day, high complexity',
        confidence: 0.94,
        units: 1,
        isSelected: false
      },
      {
        code: '71046',
        description: 'Chest X-ray, 2 views',
        confidence: 0.97,
        units: 1,
        isSelected: false
      },
      {
        code: '87070',
        description: 'Culture, bacterial, any source',
        confidence: 0.91,
        units: 1,
        isSelected: false
      },
      {
        code: '94640',
        description: 'Pressurized/nonpressurized inhalation treatment',
        confidence: 0.86,
        units: 4,
        isSelected: false
      },
      {
        code: '99232',
        description: 'Subsequent hospital care, per day, moderate complexity',
        confidence: 0.89,
        units: 4,
        isSelected: false
      }
    ],
    drgSuggestions: [
      {
        code: '177',
        description: 'Respiratory Infections & Inflammations w MCC',
        weight: 1.5789,
        score: 97,
        confidence: 0.94,
        expectedReimbursement: 14500,
        isSelected: false
      },
      {
        code: '178',
        description: 'Respiratory Infections & Inflammations w CC',
        weight: 1.0234,
        score: 85,
        confidence: 0.82,
        expectedReimbursement: 9400,
        isSelected: false
      },
      {
        code: '193',
        description: 'Simple Pneumonia & Pleurisy w MCC',
        weight: 1.2456,
        score: 78,
        confidence: 0.68,
        expectedReimbursement: 11400,
        isSelected: false
      }
    ]
  },
  {
    patientId: 'PT-12348',
    patientName: 'Linda Wilson',
    mrn: 'MRN-789459',
    admissionDate: '2024-11-13',
    aiAnalysis: 'Patient admitted with acute kidney injury. Baseline creatinine 1.0 mg/dL increased to 3.2 mg/dL, indicating Stage 3 AKI per KDIGO criteria (>3x baseline). Reduced urine output documented. AI analysis confirms severe AKI requiring close monitoring and potential dialysis consideration.',
    generatedAt: '2024-11-14T09:15:00Z',
    diagnosisCodes: [
      {
        code: 'N17.2',
        description: 'Acute kidney failure with medullary necrosis',
        confidence: 0.89,
        category: 'Primary',
        isSelected: false
      },
      {
        code: 'E87.6',
        description: 'Hypokalemia',
        confidence: 0.91,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'E11.22',
        description: 'Type 2 diabetes mellitus with diabetic chronic kidney disease',
        confidence: 0.86,
        category: 'Secondary',
        isSelected: false
      },
      {
        code: 'I10',
        description: 'Essential (primary) hypertension',
        confidence: 0.92,
        category: 'Secondary',
        isSelected: false
      }
    ],
    cptCodes: [
      {
        code: '99223',
        description: 'Initial hospital care, per day, high complexity',
        confidence: 0.95,
        units: 1,
        isSelected: false
      },
      {
        code: '80053',
        description: 'Comprehensive metabolic panel',
        confidence: 0.98,
        units: 3,
        isSelected: false
      },
      {
        code: '76770',
        description: 'Ultrasound, retroperitoneal (kidneys)',
        confidence: 0.87,
        units: 1,
        isSelected: false
      },
      {
        code: '99233',
        description: 'Subsequent hospital care, per day, high complexity',
        confidence: 0.93,
        units: 2,
        isSelected: false
      }
    ],
    drgSuggestions: [
      {
        code: '682',
        description: 'Acute Renal Failure w MCC',
        weight: 1.4567,
        score: 96,
        confidence: 0.93,
        expectedReimbursement: 13400,
        isSelected: false
      },
      {
        code: '683',
        description: 'Acute Renal Failure w CC',
        weight: 0.9876,
        score: 81,
        confidence: 0.76,
        expectedReimbursement: 9100,
        isSelected: false
      },
      {
        code: '684',
        description: 'Acute Renal Failure w/o CC/MCC',
        weight: 0.6234,
        score: 58,
        confidence: 0.42,
        expectedReimbursement: 5700,
        isSelected: false
      }
    ]
  }
]

// Function to simulate AI code generation
export const generateAICodes = async (patientData: any): Promise<CodingSuggestion> => {
  // In a real application, this would call an AI API
  // For now, return mock data
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return aiCodingSuggestions[0]
}
