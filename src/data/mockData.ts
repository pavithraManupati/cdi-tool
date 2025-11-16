import { Query, QueryTemplate, User, DashboardStats } from '../types'

export const currentUser: User = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  role: 'CDI Specialist',
  email: 'cdi@demo.com',
  department: 'Clinical Documentation'
}

export const physicianUser: User = {
  id: '2',
  name: 'Dr. Michael Chen',
  role: 'Physician',
  email: 'doctor@demo.com',
  department: 'Cardiology'
}

export const mockUsers: User[] = [
  currentUser,
  physicianUser,
  {
    id: '3',
    name: 'Jennifer Martinez',
    role: 'Clinical Coder',
    email: 'jennifer.martinez@hospital.com',
    department: 'Health Information Management'
  },
  {
    id: '4',
    name: 'Dr. Robert Williams',
    role: 'Physician',
    email: 'robert.williams@hospital.com',
    department: 'Internal Medicine'
  }
]

export const mockQueries: Query[] = [
  {
    id: 'Q-2024-001',
    patientId: 'PT-12345',
    patientName: 'John Smith',
    mrn: 'MRN-789456',
    admissionDate: '2024-11-10',
    dischargeDate: '2024-11-14',
    queryType: 'Specificity',
    status: 'Open',
    priority: 'High',
    subject: 'Heart Failure - Specificity Needed',
    description: 'Patient presents with signs and symptoms of heart failure. Documentation indicates reduced ejection fraction. Please specify: Is this acute or chronic heart failure? Please also clarify if systolic, diastolic, or combined.',
    clinicalIndicators: [
      'Ejection Fraction: 35%',
      'BNP: 850 pg/mL',
      'Dyspnea on exertion',
      'Bilateral lower extremity edema',
      'Chest X-ray: Cardiomegaly, pulmonary congestion'
    ],
    createdBy: currentUser,
    assignedTo: mockUsers[1],
    createdAt: '2024-11-12T10:30:00Z',
    updatedAt: '2024-11-12T10:30:00Z',
    dueDate: '2024-11-16T23:59:59Z',
    responses: [],
    currentDRG: '291',
    potentialDRG: '291',
    revenueImpact: 2500
  },
  {
    id: 'Q-2024-002',
    patientId: 'PT-12346',
    patientName: 'Mary Johnson',
    mrn: 'MRN-789457',
    admissionDate: '2024-11-08',
    dischargeDate: '2024-11-13',
    queryType: 'Missing Documentation',
    status: 'Pending',
    priority: 'Medium',
    subject: 'Pneumonia - Organism Documentation Missing',
    description: 'Patient diagnosed with pneumonia per chest X-ray and clinical presentation. Sputum culture was positive. Please document the specific organism identified to support more specific coding.',
    clinicalIndicators: [
      'Chest X-ray: Right lower lobe infiltrate',
      'WBC: 15,000',
      'Temperature: 101.5°F',
      'Productive cough',
      'Culture: Positive (organism not specified in documentation)'
    ],
    createdBy: currentUser,
    assignedTo: mockUsers[3],
    createdAt: '2024-11-11T14:20:00Z',
    updatedAt: '2024-11-13T09:15:00Z',
    dueDate: '2024-11-15T23:59:59Z',
    responses: [
      {
        id: 'R-001',
        queryId: 'Q-2024-002',
        author: mockUsers[3],
        content: 'Reviewing culture results. Will update documentation by end of day.',
        createdAt: '2024-11-13T09:15:00Z',
        type: 'response'
      }
    ],
    currentDRG: '193',
    potentialDRG: '177',
    revenueImpact: 3200
  },
  {
    id: 'Q-2024-003',
    patientId: 'PT-12347',
    patientName: 'Robert Davis',
    mrn: 'MRN-789458',
    admissionDate: '2024-11-05',
    dischargeDate: '2024-11-12',
    queryType: 'Clinical Validation',
    status: 'Resolved',
    priority: 'Low',
    subject: 'Sepsis - Clinical Validation',
    description: 'Patient presents with elevated WBC and fever. Two sets of blood cultures were drawn. Please validate if clinical criteria for sepsis are met based on SIRS criteria.',
    clinicalIndicators: [
      'Temperature: 102.3°F',
      'Heart Rate: 110 bpm',
      'Respiratory Rate: 24',
      'WBC: 16,500',
      'Blood cultures: Pending'
    ],
    createdBy: currentUser,
    assignedTo: mockUsers[1],
    createdAt: '2024-11-09T11:00:00Z',
    updatedAt: '2024-11-11T16:30:00Z',
    dueDate: '2024-11-13T23:59:59Z',
    responses: [
      {
        id: 'R-002',
        queryId: 'Q-2024-003',
        author: mockUsers[1],
        content: 'After review, patient meets 2 of 4 SIRS criteria. However, blood cultures were negative and patient responded quickly to antibiotics. This does not meet criteria for sepsis. Would classify as SIRS with suspected infection.',
        createdAt: '2024-11-11T16:30:00Z',
        type: 'response'
      },
      {
        id: 'R-003',
        queryId: 'Q-2024-003',
        author: currentUser,
        content: 'Thank you for the clarification. Documentation updated accordingly.',
        createdAt: '2024-11-11T16:45:00Z',
        type: 'comment'
      }
    ],
    currentDRG: '871',
    potentialDRG: '871',
    revenueImpact: 0
  },
  {
    id: 'Q-2024-004',
    patientId: 'PT-12348',
    patientName: 'Linda Wilson',
    mrn: 'MRN-789459',
    admissionDate: '2024-11-13',
    queryType: 'Clarification',
    status: 'Open',
    priority: 'Critical',
    subject: 'Acute Kidney Injury - Stage Documentation',
    description: 'Patient admitted with elevated creatinine. Baseline creatinine was 1.0, current is 3.2. Please document the stage of acute kidney injury based on KDIGO criteria.',
    clinicalIndicators: [
      'Baseline Creatinine: 1.0 mg/dL',
      'Current Creatinine: 3.2 mg/dL',
      'BUN: 45 mg/dL',
      'Urine output: 250 mL in last 12 hours',
      'Stage appears to be Stage 3 AKI'
    ],
    createdBy: currentUser,
    assignedTo: mockUsers[3],
    createdAt: '2024-11-14T08:45:00Z',
    updatedAt: '2024-11-14T08:45:00Z',
    dueDate: '2024-11-15T23:59:59Z',
    responses: [],
    currentDRG: '683',
    potentialDRG: '682',
    revenueImpact: 4100
  },
  {
    id: 'Q-2024-005',
    patientId: 'PT-12349',
    patientName: 'James Anderson',
    mrn: 'MRN-789460',
    admissionDate: '2024-11-11',
    queryType: 'Specificity',
    status: 'Escalated',
    priority: 'High',
    subject: 'Diabetes with Complications',
    description: 'Patient has documented diabetes mellitus with diabetic nephropathy and retinopathy. Please specify if diabetes is Type 1 or Type 2, and confirm the specific complications present.',
    clinicalIndicators: [
      'HbA1c: 9.2%',
      'Proteinuria present',
      'Diabetic retinopathy documented by ophthalmology',
      'Patient on insulin',
      'C-peptide levels: Not documented'
    ],
    createdBy: currentUser,
    assignedTo: mockUsers[1],
    createdAt: '2024-11-12T13:20:00Z',
    updatedAt: '2024-11-14T10:00:00Z',
    dueDate: '2024-11-14T23:59:59Z',
    responses: [
      {
        id: 'R-004',
        queryId: 'Q-2024-005',
        author: mockUsers[1],
        content: 'I need to review previous records. Will respond within 24 hours.',
        createdAt: '2024-11-13T15:30:00Z',
        type: 'response'
      }
    ],
    currentDRG: '638',
    potentialDRG: '637',
    revenueImpact: 1800
  }
]

export const queryTemplates: QueryTemplate[] = [
  {
    id: 'T-001',
    name: 'Heart Failure Specificity',
    type: 'Specificity',
    subject: 'Heart Failure - Specificity Needed',
    description: 'Patient presents with signs and symptoms of heart failure. Please specify: 1) Acute vs. Chronic, 2) Systolic, Diastolic, or Combined, 3) Preserved or Reduced ejection fraction',
    clinicalIndicators: [
      'Ejection Fraction: [VALUE]',
      'BNP/NT-proBNP: [VALUE]',
      'Clinical symptoms',
      'Imaging findings'
    ]
  },
  {
    id: 'T-002',
    name: 'Pneumonia Organism',
    type: 'Missing Documentation',
    subject: 'Pneumonia - Organism Documentation',
    description: 'Patient diagnosed with pneumonia. Culture results are available. Please document the specific organism identified.',
    clinicalIndicators: [
      'Chest X-ray findings',
      'Culture results',
      'Clinical presentation'
    ]
  },
  {
    id: 'T-003',
    name: 'Sepsis Validation',
    type: 'Clinical Validation',
    subject: 'Sepsis - Clinical Validation',
    description: 'Patient presents with signs of infection and SIRS criteria. Please validate if clinical criteria for sepsis/severe sepsis/septic shock are met.',
    clinicalIndicators: [
      'SIRS criteria met',
      'Suspected or confirmed infection',
      'Organ dysfunction present',
      'Lactate levels'
    ]
  },
  {
    id: 'T-004',
    name: 'Acute Kidney Injury Stage',
    type: 'Clarification',
    subject: 'Acute Kidney Injury - Stage Documentation',
    description: 'Patient with elevated creatinine indicating acute kidney injury. Please document the stage (1, 2, or 3) based on KDIGO criteria.',
    clinicalIndicators: [
      'Baseline creatinine',
      'Current creatinine',
      'Urine output',
      'Timeline of changes'
    ]
  },
  {
    id: 'T-005',
    name: 'Malnutrition Severity',
    type: 'Specificity',
    subject: 'Malnutrition - Severity Documentation',
    description: 'Patient shows signs of malnutrition. Please document the severity (mild, moderate, or severe) based on clinical assessment.',
    clinicalIndicators: [
      'BMI',
      'Albumin/Prealbumin',
      'Weight loss percentage',
      'Nutritional assessment'
    ]
  }
]

export const dashboardStats: DashboardStats = {
  totalQueries: 45,
  openQueries: 12,
  pendingQueries: 8,
  resolvedToday: 5,
  averageResponseTime: 18.5,
  revenueImpact: 125000
}
