import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  LinearProgress,
  Tabs,
  Tab,
  Alert,
  IconButton,
  Tooltip,
  TextField,
  Stack
} from '@mui/material'
import {
  CheckCircle,
  AutoAwesome,
  Refresh,
  Download,
  Info,
  ArrowBack,
  Edit
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { aiCodingSuggestions, generateAICodes } from '../data/aiCodingData'
import { CodingSuggestion, DiagnosisCode, CPTCode, DRGSuggestion } from '../types'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`coding-tabpanel-${index}`}
      aria-labelledby={`coding-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function PatientCoding() {
  const { patientId } = useParams<{ patientId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [patient, setPatient] = useState<CodingSuggestion | null>(null)
  const [tabValue, setTabValue] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [diagnosisCodes, setDiagnosisCodes] = useState<DiagnosisCode[]>([])
  const [cptCodes, setCptCodes] = useState<CPTCode[]>([])
  const [drgSuggestions, setDrgSuggestions] = useState<DRGSuggestion[]>([])
  
  // Manual input fields
  const [showManualInput, setShowManualInput] = useState(false)
  const [clinicalNotes, setClinicalNotes] = useState('')
  const [chiefComplaint, setChiefComplaint] = useState('')
  const [procedures, setProcedures] = useState('')
  const [labResults, setLabResults] = useState('')
  const [comorbidities, setComorbidities] = useState('')
  const [complications, setComplications] = useState('')
  const [mechanicalVentilation, setMechanicalVentilation] = useState('')
  const [lengthOfStay, setLengthOfStay] = useState('')
  const [dischargeDisposition, setDischargeDisposition] = useState('')
  const [severeIllness, setSevereIllness] = useState('')

  useEffect(() => {
    // Load patient data
    const foundPatient = aiCodingSuggestions.find(p => p.patientId === patientId)
    if (foundPatient) {
      setPatient(foundPatient)
      setDiagnosisCodes(foundPatient.diagnosisCodes)
      setCptCodes(foundPatient.cptCodes)
      setDrgSuggestions(foundPatient.drgSuggestions)
    }
  }, [patientId])

  const handleDiagnosisToggle = (code: string) => {
    setDiagnosisCodes(prev =>
      prev.map(dx => dx.code === code ? { ...dx, isSelected: !dx.isSelected } : dx)
    )
  }

  const handleCPTToggle = (code: string) => {
    setCptCodes(prev =>
      prev.map(cpt => cpt.code === code ? { ...cpt, isSelected: !cpt.isSelected } : cpt)
    )
  }

  const handleDRGSelect = (code: string) => {
    setDrgSuggestions(prev =>
      prev.map(drg => ({ ...drg, isSelected: drg.code === code }))
    )
  }

  const handleRegenerateCodes = async () => {
    if (!patient) return
    
    setIsGenerating(true)
    try {
      // In a real app, this would call the AI API with manual input
      const patientData = {
        patientId: patient.patientId,
        clinicalNotes,
        chiefComplaint,
        procedures,
        labResults,
        comorbidities,
        complications,
        mechanicalVentilation,
        lengthOfStay,
        dischargeDisposition,
        severeIllness
      }
      
      const newCodes = await generateAICodes(patientData)
      setDiagnosisCodes(newCodes.diagnosisCodes)
      setCptCodes(newCodes.cptCodes)
      setDrgSuggestions(newCodes.drgSuggestions)
      
      // Show success message
      alert('Codes regenerated successfully based on your input!')
    } catch (error) {
      console.error('Error generating codes:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedDiagnosisCount = diagnosisCodes.filter(d => d.isSelected).length
  const selectedCPTCount = cptCodes.filter(c => c.isSelected).length
  const selectedDRG = drgSuggestions.find(d => d.isSelected)
  const totalPotentialRevenue = selectedDRG?.expectedReimbursement || 0

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'success'
    if (confidence >= 0.75) return 'primary'
    if (confidence >= 0.6) return 'warning'
    return 'error'
  }

  if (!patient) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Patient not found</Typography>
        <Button onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/dashboard')} color="primary">
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4">
              {patient.patientName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              MRN: {patient.mrn} | Admission: {new Date(patient.admissionDate).toLocaleDateString()}
              {patient.dischargeDate && ` | Discharge: ${new Date(patient.dischargeDate).toLocaleDateString()}`}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => setShowManualInput(!showManualInput)}
        >
          {showManualInput ? 'Hide Manual Input' : 'Add Clinical Details'}
        </Button>
      </Box>

      {/* Manual Input Section */}
      {showManualInput && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Edit /> Manual Clinical Input
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Provide additional clinical information to help AI generate more accurate codes
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Chief Complaint / Presenting Problem"
                multiline
                rows={2}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                placeholder="e.g., Patient presents with chest pain and shortness of breath..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Clinical Notes / History"
                multiline
                rows={4}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="e.g., Patient has history of hypertension, diabetes. Current symptoms include..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Procedures Performed"
                multiline
                rows={3}
                value={procedures}
                onChange={(e) => setProcedures(e.target.value)}
                placeholder="e.g., Echocardiogram, Chest X-ray, Blood work..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lab Results / Findings"
                multiline
                rows={3}
                value={labResults}
                onChange={(e) => setLabResults(e.target.value)}
                placeholder="e.g., BNP: 850, Ejection Fraction: 35%, WBC: 15,000..."
              />
            </Grid>
            
            {/* DRG/Severity Impact Factors */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                DRG Weight & Severity Factors
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                These factors significantly impact DRG assignment, severity score, and reimbursement
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Comorbidities / Pre-existing Conditions"
                multiline
                rows={3}
                value={comorbidities}
                onChange={(e) => setComorbidities(e.target.value)}
                placeholder="e.g., Diabetes with complications, CHF, COPD, CKD Stage 3..."
                helperText="Major Complication/Comorbidity (MCC) increases DRG weight"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Complications During Stay"
                multiline
                rows={3}
                value={complications}
                onChange={(e) => setComplications(e.target.value)}
                placeholder="e.g., Acute respiratory failure, sepsis, acute kidney injury..."
                helperText="Complications can shift to higher-weighted DRG"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Mechanical Ventilation"
                value={mechanicalVentilation}
                onChange={(e) => setMechanicalVentilation(e.target.value)}
                placeholder="e.g., 96+ hours, <96 hours, or None"
                helperText="Ventilation hours significantly affect DRG"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Length of Stay (Days)"
                type="number"
                value={lengthOfStay}
                onChange={(e) => setLengthOfStay(e.target.value)}
                placeholder="e.g., 5"
                helperText="Extended LOS may indicate higher severity"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Discharge Disposition"
                value={dischargeDisposition}
                onChange={(e) => setDischargeDisposition(e.target.value)}
                placeholder="e.g., Home, SNF, LTAC, Expired"
                helperText="Discharge to facility suggests higher complexity"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Severe Illness Indicators"
                multiline
                rows={2}
                value={severeIllness}
                onChange={(e) => setSevereIllness(e.target.value)}
                placeholder="e.g., ICU admission, pressors, dialysis, transfusions, shock..."
                helperText="Critical care interventions increase severity score and DRG weight"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AutoAwesome />}
                onClick={handleRegenerateCodes}
                disabled={isGenerating || (!clinicalNotes && !chiefComplaint && !procedures && !labResults && !comorbidities && !complications && !mechanicalVentilation && !lengthOfStay && !dischargeDisposition && !severeIllness)}
                fullWidth
                size="large"
              >
                {isGenerating ? 'Generating AI Codes...' : 'Generate Codes from Input'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* AI Analysis */}
      <Alert
        icon={<AutoAwesome />}
        severity="info"
        sx={{ mb: 3 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              AI Analysis
            </Typography>
            <Typography variant="body2">
              {patient.aiAnalysis}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRegenerateCodes}
            disabled={isGenerating}
            sx={{ ml: 2, flexShrink: 0 }}
          >
            Regenerate
          </Button>
        </Box>
      </Alert>

      {/* Code Selection Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {selectedDiagnosisCount}/{diagnosisCodes.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Diagnosis Codes Selected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {selectedCPTCount}/{cptCodes.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CPT Codes Selected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="secondary">
                {selectedDRG ? selectedDRG.code : '--'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                DRG {selectedDRG ? `(Wt: ${selectedDRG.weight.toFixed(2)})` : 'Not Selected'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                ${(totalPotentialRevenue / 1000).toFixed(1)}K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expected Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {isGenerating && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            AI is analyzing clinical documentation and generating codes...
          </Typography>
        </Box>
      )}

      {/* Tabs for Code Categories */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={`Diagnosis Codes (${diagnosisCodes.length})`} />
          <Tab label={`CPT Codes (${cptCodes.length})`} />
          <Tab label={`DRG Suggestions (${drgSuggestions.length})`} />
        </Tabs>

        {/* Diagnosis Codes Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">Select</TableCell>
                  <TableCell>ICD-10 Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>AI Confidence</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diagnosisCodes.map((dx) => (
                  <TableRow
                    key={dx.code}
                    sx={{
                      bgcolor: dx.isSelected ? 'action.selected' : 'inherit',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={dx.isSelected}
                        onChange={() => handleDiagnosisToggle(dx.code)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {dx.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{dx.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={dx.category}
                        size="small"
                        color={dx.category === 'Primary' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={dx.confidence * 100}
                            color={getConfidenceColor(dx.confidence)}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          {(dx.confidence * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View details">
                        <IconButton size="small">
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* CPT Codes Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">Select</TableCell>
                  <TableCell>CPT Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Units</TableCell>
                  <TableCell>AI Confidence</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cptCodes.map((cpt) => (
                  <TableRow
                    key={cpt.code}
                    sx={{
                      bgcolor: cpt.isSelected ? 'action.selected' : 'inherit',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={cpt.isSelected}
                        onChange={() => handleCPTToggle(cpt.code)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {cpt.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{cpt.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={`${cpt.units}x`} size="small" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={cpt.confidence * 100}
                            color={getConfidenceColor(cpt.confidence)}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          {(cpt.confidence * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View details">
                        <IconButton size="small">
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* DRG Suggestions Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">Select</TableCell>
                  <TableCell>DRG Code</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>AI Confidence</TableCell>
                  <TableCell>Expected Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drgSuggestions.map((drg) => (
                  <TableRow
                    key={drg.code}
                    sx={{
                      bgcolor: drg.isSelected ? 'success.lighter' : 'inherit',
                      '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' }
                    }}
                    onClick={() => handleDRGSelect(drg.code)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={drg.isSelected}
                        onChange={() => handleDRGSelect(drg.code)}
                        color="success"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {drg.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{drg.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {drg.weight.toFixed(4)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={drg.score}
                        size="small"
                        color={drg.score >= 90 ? 'success' : drg.score >= 75 ? 'primary' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={drg.confidence * 100}
                            color={getConfidenceColor(drg.confidence)}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          {(drg.confidence * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        ${drg.expectedReimbursement.toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* Action Buttons */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Code Summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedDiagnosisCount} Diagnosis codes, {selectedCPTCount} CPT codes, and{' '}
              {selectedDRG ? '1 DRG' : 'no DRG'} selected
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
            >
              Back to Cases
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              disabled={selectedDiagnosisCount === 0 && selectedCPTCount === 0}
            >
              Export Codes
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              disabled={selectedDiagnosisCount === 0 || !selectedDRG}
            >
              Submit for Review
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}
