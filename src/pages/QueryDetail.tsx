import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  List,
  ListItem,
  Avatar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material'
import {
  ArrowBack,
  Send,
  Edit,
  CheckCircle,
  AttachFile,
  LocalHospital,
  TrendingUp,
  Refresh,
  Info,
  AutoAwesome,
  ExpandMore,
  Warning,
  ThumbUp,
  BarChart
} from '@mui/icons-material'
import { format } from 'date-fns'
import { mockQueries } from '../data/mockData'
import { QueryStatus, CDIComplianceSuggestion, ComplianceSeverity } from '../types'
import { getMockDRGPricing, DRGPricingResponse } from '../services/cmsWebPricer'

export default function QueryDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const query = mockQueries.find(q => q.id === id)
  const [response, setResponse] = useState('')
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<QueryStatus>('Open')
  const [patientDialogOpen, setPatientDialogOpen] = useState(false)
  const [guidelinesDialogOpen, setGuidelinesDialogOpen] = useState(false)
  const [similarDialogOpen, setSimilarDialogOpen] = useState(false)
  const [similarCases, setSimilarCases] = useState<typeof mockQueries>([])
  
  // DRG Pricing states
  const [currentDRGPricing, setCurrentDRGPricing] = useState<DRGPricingResponse | null>(null)
  const [potentialDRGPricing, setPotentialDRGPricing] = useState<DRGPricingResponse | null>(null)
  const [pricingLoading, setPricingLoading] = useState(false)
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false)
  
  // AI Compliance Suggestions states
  const [aiSuggestions, setAiSuggestions] = useState<CDIComplianceSuggestion[]>([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)

  // Fetch DRG pricing when component mounts
  useEffect(() => {
    if (query?.currentDRG && query?.potentialDRG) {
      fetchDRGPricing()
      generateAIComplianceSuggestions()
    }
  }, [query?.currentDRG, query?.potentialDRG])

  const fetchDRGPricing = async () => {
    if (!query?.currentDRG || !query?.potentialDRG) return
    
    setPricingLoading(true)
    try {
      // In production, replace with actual API call
      // const currentPricing = await fetchDRGPricing({ drg: query.currentDRG, ... })
      const currentPricing = getMockDRGPricing(query.currentDRG)
      const potentialPricing = getMockDRGPricing(query.potentialDRG)
      
      setCurrentDRGPricing(currentPricing)
      setPotentialDRGPricing(potentialPricing)
    } catch (error) {
      console.error('Error fetching DRG pricing:', error)
    } finally {
      setPricingLoading(false)
    }
  }
  
  const generateAIComplianceSuggestions = async () => {
    if (!query) return
    
    setSuggestionsLoading(true)
    try {
      // Simulate AI analysis - in production, this would call an AI API
      const suggestions: CDIComplianceSuggestion[] = []
      
      // Analyze based on query type and clinical indicators
      if (query.queryType === 'Specificity' && query.subject.toLowerCase().includes('heart failure')) {
        suggestions.push({
          id: 'AI-HF-001',
          category: 'documentation',
          severity: 'high',
          title: 'Heart Failure Specificity Impact on DRG',
          description: 'Documenting specific heart failure type (acute vs chronic, systolic vs diastolic) can significantly impact DRG assignment and reimbursement.',
          recommendation: 'Request physician to document: 1) Acute or Chronic status, 2) Systolic/Diastolic/Combined classification, 3) Reduced or preserved EF',
          documentationNeeded: [
            'Acute vs Chronic heart failure status',
            'Systolic, Diastolic, or Combined type',
            'Ejection fraction percentage',
            'NYHA functional classification'
          ],
          currentDRG: query.currentDRG,
          potentialDRG: '293',
          currentWeight: 0.6824,
          potentialWeight: 1.0547,
          weightIncrease: 0.3723,
          currentScore: 68,
          potentialScore: 95,
          revenueIncrease: 2500,
          regulatoryReference: 'ICD-10-CM Section I.C.9.a - Heart Failure Specificity Guidelines',
          confidence: 0.94,
          isAddressed: false
        })
      }
      
      if (query.clinicalIndicators.some(ci => ci.toLowerCase().includes('creatinine'))) {
        suggestions.push({
          id: 'AI-AKI-002',
          category: 'coding',
          severity: 'critical',
          title: 'Acute Kidney Injury - MCC Opportunity',
          description: 'Elevated creatinine suggests AKI. Documenting AKI stage adds Major Complication/Comorbidity (MCC) which significantly increases DRG weight.',
          recommendation: 'Query for AKI stage documentation (1, 2, or 3) using KDIGO criteria based on creatinine elevation and urine output.',
          documentationNeeded: [
            'Baseline creatinine value',
            'Peak creatinine during stay',
            'AKI stage (1, 2, or 3) per KDIGO',
            'Urine output measurements'
          ],
          currentDRG: query.currentDRG || '291',
          potentialDRG: '682',
          currentWeight: 0.6824,
          potentialWeight: 1.4239,
          weightIncrease: 0.7415,
          currentScore: 68,
          potentialScore: 92,
          revenueIncrease: 4800,
          regulatoryReference: 'KDIGO Clinical Practice Guidelines for AKI',
          confidence: 0.91,
          isAddressed: false
        })
      }
      
      if (query.clinicalIndicators.some(ci => ci.toLowerCase().includes('fever') || ci.toLowerCase().includes('wbc'))) {
        suggestions.push({
          id: 'AI-SEP-003',
          category: 'clinical-validity',
          severity: 'critical',
          title: 'Sepsis Validation - High DRG Impact',
          description: 'Clinical indicators suggest potential sepsis. Validated sepsis diagnosis creates substantial DRG weight increase and revenue impact.',
          recommendation: 'Validate sepsis criteria: infection source + SOFA score ≥2 + organ dysfunction. Document sepsis severity (sepsis vs severe sepsis vs septic shock).',
          documentationNeeded: [
            'Documented infection source',
            'SOFA score or SIRS criteria',
            'Organ dysfunction specifics',
            'Lactate levels',
            'Blood culture results',
            'Sepsis severity classification'
          ],
          currentDRG: query.currentDRG || '871',
          potentialDRG: '870',
          currentWeight: 0.5826,
          potentialWeight: 1.5924,
          weightIncrease: 1.0098,
          currentScore: 58,
          potentialScore: 94,
          revenueIncrease: 6500,
          regulatoryReference: 'CMS SEP-1 Core Measure & Sepsis-3 Criteria',
          confidence: 0.88,
          isAddressed: false
        })
      }
      
      // Add malnutrition opportunity
      suggestions.push({
        id: 'AI-MAL-004',
        category: 'documentation',
        severity: 'medium',
        title: 'Malnutrition Documentation Opportunity',
        description: 'Complex medical cases often have concurrent malnutrition. Documenting severity adds CC/MCC value to DRG.',
        recommendation: 'Request nutritional assessment. If malnutrition present, document severity using validated criteria (mild, moderate, severe).',
        documentationNeeded: [
          'BMI calculation',
          'Albumin/Prealbumin levels',
          'Weight loss percentage and timeline',
          'Muscle wasting assessment',
          'Severity classification (mild/moderate/severe)'
        ],
        currentDRG: query.currentDRG,
        potentialDRG: query.currentDRG, // Same DRG but with MCC
        currentWeight: 0.6824,
        potentialWeight: 0.9547,
        weightIncrease: 0.2723,
        currentScore: 68,
        potentialScore: 85,
        revenueIncrease: 2200,
        regulatoryReference: 'Academy of Nutrition & Dietetics Malnutrition Criteria',
        confidence: 0.76,
        isAddressed: false
      })
      
      // Add POA compliance check
      suggestions.push({
        id: 'AI-POA-005',
        category: 'regulatory',
        severity: 'high',
        title: 'Present on Admission (POA) Compliance',
        description: 'POA indicators must be accurate to avoid HAC penalties and maintain compliance with CMS requirements.',
        recommendation: 'Review admission documentation to confirm POA status for all diagnoses. Hospital-acquired conditions can result in payment penalties.',
        documentationNeeded: [
          'Admission assessment documentation',
          'Timing of condition onset',
          'POA indicator (Y/N/U/W) for each diagnosis'
        ],
        potentialDRG: query.currentDRG,
        revenueIncrease: 0,
        regulatoryReference: 'Deficit Reduction Act 2005 Section 5001(c) - POA Reporting',
        confidence: 0.95,
        isAddressed: false
      })
      
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error('Error generating AI suggestions:', error)
    } finally {
      setSuggestionsLoading(false)
    }
  }
  
  const handleApplySuggestion = (suggestionId: string) => {
    setAiSuggestions(prev =>
      prev.map(s => s.id === suggestionId ? { ...s, isAddressed: true } : s)
    )
  }
  
  const getSeverityColor = (severity: ComplianceSeverity) => {
    switch (severity) {
      case 'critical': return 'error'
      case 'high': return 'warning'
      case 'medium': return 'info'
      case 'low': return 'success'
      case 'info': return 'default'
      default: return 'default'
    }
  }
  
  const getSeverityIcon = (severity: ComplianceSeverity) => {
    switch (severity) {
      case 'critical': return <Warning color="error" />
      case 'high': return <Warning color="warning" />
      default: return <Info color="info" />
    }
  }

  if (!query) {
    return (
      <Box>
        <Typography variant="h5">Query not found</Typography>
        <Button onClick={() => navigate('/queries')}>Back to Queries</Button>
      </Box>
    )
  }

  const handleSendResponse = () => {
    if (response.trim()) {
      // In a real app, this would send to backend
      console.log('Sending response:', response)
      setResponse('')
      alert('Response sent successfully!')
    }
  }

  const handleStatusChange = () => {
    console.log('Changing status to:', newStatus)
    setStatusDialogOpen(false)
    alert(`Status updated to ${newStatus}`)
  }

  const getStatusColor = (status: QueryStatus) => {
    switch (status) {
      case 'Open': return 'primary'
      case 'Pending': return 'warning'
      case 'Resolved': return 'success'
      case 'Escalated': return 'error'
      default: return 'default'
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/queries')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Query Details: {query.id}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => setStatusDialogOpen(true)}
          sx={{ mr: 1 }}
        >
          Change Status
        </Button>
        {query.status !== 'Resolved' && (
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            color="success"
            onClick={() => {
              setNewStatus('Resolved')
              setStatusDialogOpen(true)
            }}
          >
            Mark Resolved
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Query Header Card */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={query.status}
                color={getStatusColor(query.status)}
              />
              <Chip
                label={query.priority}
                color={query.priority === 'Critical' ? 'error' : query.priority === 'High' ? 'warning' : 'default'}
                variant="outlined"
              />
              <Chip label={query.queryType} />
            </Box>

            <Typography variant="h5" gutterBottom>
              {query.subject}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Patient</Typography>
                <Typography variant="body1">{query.patientName}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">MRN</Typography>
                <Typography variant="body1">{query.mrn}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Admission</Typography>
                <Typography variant="body1">
                  {format(new Date(query.admissionDate), 'MMM dd, yyyy')}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Due Date</Typography>
                <Typography variant="body1">
                  {format(new Date(query.dueDate), 'MMM dd, yyyy')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Query Description
            </Typography>
            <Typography variant="body1" paragraph>
              {query.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Clinical Indicators
            </Typography>
            <List>
              {query.clinicalIndicators.map((indicator, index) => (
                <ListItem key={index} sx={{ py: 0.5 }}>
                  <Box
                    component="span"
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      mr: 1.5
                    }}
                  />
                  <Typography variant="body2">{indicator}</Typography>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Conversation Thread */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Conversation Thread
            </Typography>

            {query.responses.length === 0 ? (
              <Alert severity="info" sx={{ mb: 3 }}>
                No responses yet. Be the first to respond!
              </Alert>
            ) : (
              <List sx={{ mb: 3 }}>
                {query.responses.map((resp) => (
                  <ListItem
                    key={resp.id}
                    alignItems="flex-start"
                    sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mb: 2, p: 2 }}
                  >
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {resp.author.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box>
                          <Typography variant="subtitle2">
                            {resp.author.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {resp.author.role}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(resp.createdAt), 'MMM dd, yyyy h:mm a')}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        {resp.content}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Response Input */}
            {query.status !== 'Resolved' && (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Type your response here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Send />}
                    onClick={handleSendResponse}
                    disabled={!response.trim()}
                  >
                    Send Response
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<AttachFile />}
                  >
                    Attach File
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Assignment Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <LocalHospital sx={{ mr: 1, verticalAlign: 'middle' }} />
                Assignment
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Created By</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.main' }}>
                    {query.createdBy.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{query.createdBy.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {query.createdBy.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">Assigned To</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                    {query.assignedTo.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{query.assignedTo.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {query.assignedTo.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Created</Typography>
                <Typography variant="body2">
                  {format(new Date(query.createdAt), 'MMM dd, yyyy h:mm a')}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Revenue Impact Card */}
          <Card sx={{ mb: 3, bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Revenue Impact
                </Typography>
                <Box>
                  <Tooltip title="Refresh DRG Pricing">
                    <IconButton size="small" onClick={fetchDRGPricing} disabled={pricingLoading}>
                      <Refresh fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Detailed Pricing">
                    <IconButton size="small" onClick={() => setPricingDialogOpen(true)}>
                      <Info fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {pricingLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                  <CircularProgress size={40} />
                </Box>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Current DRG</Typography>
                    <Typography variant="h6">{query.currentDRG}</Typography>
                    {currentDRGPricing && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        ${currentDRGPricing.totalPayment.toLocaleString()}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Potential DRG</Typography>
                    <Typography variant="h6" color="primary">{query.potentialDRG}</Typography>
                    {potentialDRGPricing && (
                      <Typography variant="caption" color="success.main" display="block">
                        ${potentialDRGPricing.totalPayment.toLocaleString()}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary">Revenue Opportunity</Typography>
                    <Typography variant="h4" color="success.main">
                      ${(potentialDRGPricing && currentDRGPricing 
                        ? potentialDRGPricing.totalPayment - currentDRGPricing.totalPayment 
                        : query.revenueImpact || 0).toLocaleString()}
                    </Typography>
                    {currentDRGPricing && potentialDRGPricing && (
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                        Based on CMS WebPricer rates
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>

          {/* AI Compliance Suggestions */}
          <Card sx={{ mb: 3, border: 2, borderColor: 'primary.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  <AutoAwesome sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                  AI Compliance Insights
                </Typography>
                <Tooltip title="Refresh AI Analysis">
                  <IconButton size="small" onClick={generateAIComplianceSuggestions} disabled={suggestionsLoading}>
                    <Refresh fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {suggestionsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                  <CircularProgress size={40} />
                </Box>
              ) : aiSuggestions.length === 0 ? (
                <Alert severity="info" icon={<AutoAwesome />}>
                  <Typography variant="body2">
                    No AI suggestions available. Click refresh to generate insights.
                  </Typography>
                </Alert>
              ) : (
                <Box>
                  <Alert severity="info" sx={{ mb: 2 }} icon={<AutoAwesome />}>
                    <Typography variant="caption">
                      AI analyzed this case and found <strong>{aiSuggestions.length} opportunities</strong> to improve documentation and DRG accuracy.
                    </Typography>
                  </Alert>
                  
                  {aiSuggestions.map((suggestion, index) => (
                    <Accordion 
                      key={suggestion.id}
                      sx={{ 
                        mb: 1,
                        border: 1,
                        borderColor: `${getSeverityColor(suggestion.severity)}.main`,
                        '&:before': { display: 'none' }
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            {getSeverityIcon(suggestion.severity)}
                            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                              {suggestion.title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={suggestion.severity.toUpperCase()} 
                              size="small" 
                              color={getSeverityColor(suggestion.severity)}
                            />
                            {suggestion.revenueIncrease && suggestion.revenueIncrease > 0 && (
                              <Chip 
                                label={`+$${suggestion.revenueIncrease.toLocaleString()}`} 
                                size="small" 
                                color="success"
                                icon={<TrendingUp />}
                              />
                            )}
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" paragraph>
                          {suggestion.description}
                        </Typography>
                        
                        <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                          <Typography variant="subtitle2" gutterBottom color="primary">
                            <AutoAwesome fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                            AI Recommendation:
                          </Typography>
                          <Typography variant="body2">
                            {suggestion.recommendation}
                          </Typography>
                        </Paper>
                        
                        {suggestion.documentationNeeded && suggestion.documentationNeeded.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Documentation Needed:
                            </Typography>
                            <List dense>
                              {suggestion.documentationNeeded.map((doc, idx) => (
                                <ListItem key={idx} sx={{ py: 0.5, pl: 0 }}>
                                  <Box
                                    component="span"
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      bgcolor: 'primary.main',
                                      mr: 1.5,
                                      flexShrink: 0
                                    }}
                                  />
                                  <Typography variant="caption">{doc}</Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {/* DRG Impact Section */}
                        {suggestion.weightIncrease && (
                          <Paper sx={{ p: 2, bgcolor: '#e8f5e9', mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom color="success.main">
                              <BarChart fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                              DRG Weight & Score Impact:
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">Current Weight</Typography>
                                <Typography variant="h6">{suggestion.currentWeight?.toFixed(4)}</Typography>
                                <Typography variant="caption" color="text.secondary">Score: {suggestion.currentScore}</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption" color="success.main">Potential Weight</Typography>
                                <Typography variant="h6" color="success.main">
                                  {suggestion.potentialWeight?.toFixed(4)}
                                </Typography>
                                <Typography variant="caption" color="success.main">Score: {suggestion.potentialScore}</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="caption" color="text.secondary">Weight Increase</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="h5" color="success.main">
                                    +{suggestion.weightIncrease?.toFixed(4)}
                                  </Typography>
                                  <Chip 
                                    label={`${((suggestion.weightIncrease! / suggestion.currentWeight!) * 100).toFixed(1)}%`} 
                                    size="small" 
                                    color="success"
                                  />
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                  DRG: {suggestion.currentDRG} → {suggestion.potentialDRG}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        )}
                        
                        {suggestion.regulatoryReference && (
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                            📋 Reference: {suggestion.regulatoryReference}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              AI Confidence:
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={suggestion.confidence * 100}
                              sx={{ width: 60, height: 6, borderRadius: 3 }}
                              color={suggestion.confidence >= 0.9 ? 'success' : suggestion.confidence >= 0.75 ? 'primary' : 'warning'}
                            />
                            <Typography variant="caption" fontWeight="bold">
                              {(suggestion.confidence * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                          <Button
                            size="small"
                            variant={suggestion.isAddressed ? 'outlined' : 'contained'}
                            color={suggestion.isAddressed ? 'success' : 'primary'}
                            startIcon={suggestion.isAddressed ? <CheckCircle /> : <ThumbUp />}
                            onClick={() => handleApplySuggestion(suggestion.id)}
                          >
                            {suggestion.isAddressed ? 'Applied' : 'Apply'}
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  
                  {aiSuggestions.filter(s => s.revenueIncrease && s.revenueIncrease > 0).length > 0 && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Total Revenue Opportunity: ${aiSuggestions
                          .filter(s => s.revenueIncrease && s.revenueIncrease > 0)
                          .reduce((sum, s) => sum + (s.revenueIncrease || 0), 0)
                          .toLocaleString()}
                      </Typography>
                      <Typography variant="caption">
                        By addressing these AI-identified opportunities
                      </Typography>
                    </Alert>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setPatientDialogOpen(true)}
                  >
                    View Patient Chart
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setGuidelinesDialogOpen(true)}
                  >
                    View Coding Guidelines
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      // find similar cases by overlapping clinical indicators
                      const similar = mockQueries.filter(q =>
                        q.id !== query.id && q.clinicalIndicators.some(ci => query.clinicalIndicators.includes(ci))
                      )
                      setSimilarCases(similar)
                      setSimilarDialogOpen(true)
                    }}
                  >
                    Similar Cases
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      // basic print action - prints current page; in a full app we'd print a formatted region
                      window.print()
                    }}
                  >
                    Print Query
                  </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Change Query Status</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>New Status</InputLabel>
            <Select
              value={newStatus}
              label="New Status"
              onChange={(e) => setNewStatus(e.target.value as QueryStatus)}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Escalated">Escalated</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Comment (optional)"
            placeholder="Add a comment about this status change..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusChange} variant="contained">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>

      {/* Patient Chart Dialog */}
      <Dialog open={patientDialogOpen} onClose={() => setPatientDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Patient Chart - {query.patientName}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" color="text.secondary">MRN</Typography>
          <Typography variant="body1" paragraph>{query.mrn}</Typography>

          <Typography variant="subtitle2" color="text.secondary">Admission Date</Typography>
          <Typography variant="body1" paragraph>{format(new Date(query.admissionDate), 'PPP')}</Typography>

          {query.dischargeDate && (
            <>
              <Typography variant="subtitle2" color="text.secondary">Discharge Date</Typography>
              <Typography variant="body1" paragraph>{format(new Date(query.dischargeDate), 'PPP')}</Typography>
            </>
          )}

          <Typography variant="subtitle2" color="text.secondary">Clinical Indicators</Typography>
          <List>
            {query.clinicalIndicators.map((ci, idx) => (
              <ListItem key={idx} sx={{ py: 0.5 }}>
                <Typography variant="body2">{ci}</Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPatientDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Coding Guidelines Dialog */}
      <Dialog open={guidelinesDialogOpen} onClose={() => setGuidelinesDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Coding Guidelines</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">ICD-10 Coding Tips</Typography>
          <Typography variant="body2" paragraph>
            • Include specificity (acute vs chronic) where applicable.
          </Typography>
          <Typography variant="body2" paragraph>
            • Document laterality, stage, and organism when relevant to support more specific codes.
          </Typography>
          <Typography variant="body2" paragraph>
            • For complex cases, reference official ICD-10-CM guidelines or consult a coder.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuidelinesDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Similar Cases Dialog */}
      <Dialog open={similarDialogOpen} onClose={() => setSimilarDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Similar Cases</DialogTitle>
        <DialogContent dividers>
          {similarCases.length === 0 ? (
            <Typography variant="body2">No similar cases found for the selected indicators.</Typography>
          ) : (
            <List>
              {similarCases.map((sq) => (
                <ListItem key={sq.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2">{sq.subject} — {sq.patientName} ({sq.id})</Typography>
                  <Typography variant="caption" color="text.secondary">Status: {sq.status} | Priority: {sq.priority}</Typography>
                  <Divider sx={{ my: 1 }} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSimilarDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* DRG Pricing Details Dialog */}
      <Dialog open={pricingDialogOpen} onClose={() => setPricingDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Detailed DRG Pricing Analysis</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Current DRG Details */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  Current DRG: {query.currentDRG}
                </Typography>
                {currentDRGPricing && (
                  <>
                    <Typography variant="body2" paragraph>
                      <strong>Description:</strong> {currentDRGPricing.drgDescription}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Base Payment:</strong> ${currentDRGPricing.basePaymentRate.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Capital Payment:</strong> ${currentDRGPricing.capitalPayment.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Outlier Payment:</strong> ${currentDRGPricing.outlierPayment.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" color="primary">
                      <strong>Total Payment:</strong> ${currentDRGPricing.totalPayment.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" display="block">
                      Geometric Mean LOS: {currentDRGPricing.geometricMeanLOS} days
                    </Typography>
                    <Typography variant="caption" display="block">
                      Arithmetic Mean LOS: {currentDRGPricing.arithmeticMeanLOS} days
                    </Typography>
                    <Typography variant="caption" display="block">
                      Wage Index: {currentDRGPricing.wage_index}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>

            {/* Potential DRG Details */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                <Typography variant="h6" gutterBottom color="success.main">
                  Potential DRG: {query.potentialDRG}
                </Typography>
                {potentialDRGPricing && (
                  <>
                    <Typography variant="body2" paragraph>
                      <strong>Description:</strong> {potentialDRGPricing.drgDescription}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Base Payment:</strong> ${potentialDRGPricing.basePaymentRate.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Capital Payment:</strong> ${potentialDRGPricing.capitalPayment.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Outlier Payment:</strong> ${potentialDRGPricing.outlierPayment.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h6" color="success.main">
                      <strong>Total Payment:</strong> ${potentialDRGPricing.totalPayment.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" display="block">
                      Geometric Mean LOS: {potentialDRGPricing.geometricMeanLOS} days
                    </Typography>
                    <Typography variant="caption" display="block">
                      Arithmetic Mean LOS: {potentialDRGPricing.arithmeticMeanLOS} days
                    </Typography>
                    <Typography variant="caption" display="block">
                      Wage Index: {potentialDRGPricing.wage_index}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>

            {/* Revenue Impact Summary */}
            {currentDRGPricing && potentialDRGPricing && (
              <Grid item xs={12}>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Revenue Opportunity: ${(potentialDRGPricing.totalPayment - currentDRGPricing.totalPayment).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    By improving documentation to support {query.potentialDRG}, this case could generate{' '}
                    <strong>
                      {Math.round(((potentialDRGPricing.totalPayment - currentDRGPricing.totalPayment) / currentDRGPricing.totalPayment) * 100)}%
                    </strong>{' '}
                    more revenue.
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
          
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            * Pricing based on CMS WebPricer rates. Actual reimbursement may vary based on hospital-specific factors,
            geographic adjustments, and payer contracts.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={fetchDRGPricing} startIcon={<Refresh />}>
            Refresh Pricing
          </Button>
          <Button onClick={() => setPricingDialogOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
