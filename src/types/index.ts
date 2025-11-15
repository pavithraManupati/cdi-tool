export type QueryStatus = 'Open' | 'Pending' | 'Resolved' | 'Escalated'
export type QueryType = 'Specificity' | 'Missing Documentation' | 'Clarification' | 'Clinical Validation' | 'Other'
export type UserRole = 'Physician' | 'Clinical Coder' | 'CDI Specialist' | 'Administrator'
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical'

export interface User {
  id: string
  name: string
  role: UserRole
  email: string
  department?: string
}

export interface Query {
  id: string
  patientId: string
  patientName: string
  mrn: string
  admissionDate: string
  dischargeDate?: string
  queryType: QueryType
  status: QueryStatus
  priority: Priority
  subject: string
  description: string
  clinicalIndicators: string[]
  createdBy: User
  assignedTo: User
  createdAt: string
  updatedAt: string
  dueDate: string
  responses: QueryResponse[]
  attachments?: Attachment[]
  currentDRG?: string
  potentialDRG?: string
  revenueImpact?: number
}

export interface QueryResponse {
  id: string
  queryId: string
  author: User
  content: string
  createdAt: string
  type: 'response' | 'comment' | 'status_change'
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedBy: User
  uploadedAt: string
}

export interface QueryTemplate {
  id: string
  name: string
  type: QueryType
  subject: string
  description: string
  clinicalIndicators: string[]
}

export interface DashboardStats {
  totalQueries: number
  openQueries: number
  pendingQueries: number
  resolvedToday: number
  averageResponseTime: number
  revenueImpact: number
}
