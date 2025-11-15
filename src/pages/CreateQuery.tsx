import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Autocomplete,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material'
import {
  ArrowBack,
  Add,
  Delete,
  Save,
  Send
} from '@mui/icons-material'
import { mockUsers, queryTemplates } from '../data/mockData'
import { QueryType, Priority } from '../types'

export default function CreateQuery() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  
  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    mrn: '',
    admissionDate: '',
    dischargeDate: '',
    queryType: '' as QueryType | '',
    priority: 'Medium' as Priority,
    assignedTo: '',
    subject: '',
    description: '',
    clinicalIndicators: [''] as string[],
    currentDRG: '',
    potentialDRG: '',
    dueDate: ''
  })

  const steps = ['Select Template', 'Patient Information', 'Query Details', 'Review & Submit']

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = queryTemplates.find(t => t.id === templateId)
    if (template) {
      setFormData({
        ...formData,
        queryType: template.type,
        subject: template.subject,
        description: template.description,
        clinicalIndicators: [...template.clinicalIndicators]
      })
      setSelectedTemplate(templateId)
    }
  }

  const handleAddIndicator = () => {
    setFormData({
      ...formData,
      clinicalIndicators: [...formData.clinicalIndicators, '']
    })
  }

  const handleRemoveIndicator = (index: number) => {
    const newIndicators = formData.clinicalIndicators.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      clinicalIndicators: newIndicators
    })
  }

  const handleIndicatorChange = (index: number, value: string) => {
    const newIndicators = [...formData.clinicalIndicators]
    newIndicators[index] = value
    setFormData({
      ...formData,
      clinicalIndicators: newIndicators
    })
  }

  const handleSubmit = () => {
    console.log('Submitting query:', formData)
    alert('Query created successfully!')
    navigate('/queries')
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose a Template (Optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Start with a pre-built template or create from scratch
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedTemplate === '' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    '&:hover': { boxShadow: 3 }
                  }}
                  onClick={() => setSelectedTemplate('')}
                >
                  <CardContent>
                    <Typography variant="h6">Blank Query</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start from scratch with a blank query
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {queryTemplates.map((template) => (
                <Grid item xs={12} md={6} key={template.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      '&:hover': { boxShadow: 3 }
                    }}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent>
                      <Chip label={template.type} size="small" sx={{ mb: 1 }} />
                      <Typography variant="h6">{template.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.description.substring(0, 100)}...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Patient Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Patient Name"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Medical Record Number (MRN)"
                  value={formData.mrn}
                  onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Admission Date"
                  value={formData.admissionDate}
                  onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Discharge Date"
                  value={formData.dischargeDate}
                  onChange={(e) => setFormData({ ...formData, dischargeDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current DRG"
                  value={formData.currentDRG}
                  onChange={(e) => setFormData({ ...formData, currentDRG: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Potential DRG"
                  value={formData.potentialDRG}
                  onChange={(e) => setFormData({ ...formData, potentialDRG: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        )

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Query Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl required fullWidth>
                  <InputLabel>Query Type</InputLabel>
                  <Select
                    value={formData.queryType}
                    label="Query Type"
                    onChange={(e) => setFormData({ ...formData, queryType: e.target.value as QueryType })}
                  >
                    <MenuItem value="Specificity">Specificity</MenuItem>
                    <MenuItem value="Missing Documentation">Missing Documentation</MenuItem>
                    <MenuItem value="Clarification">Clarification</MenuItem>
                    <MenuItem value="Clinical Validation">Clinical Validation</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl required fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={formData.priority}
                    label="Priority"
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={mockUsers.filter(u => u.role === 'Physician')}
                  getOptionLabel={(option) => `${option.name} - ${option.department || ''}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Assign To" required />
                  )}
                  onChange={(_e, value) => setFormData({ ...formData, assignedTo: value?.id || '' })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief subject line for the query"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the query"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">Clinical Indicators</Typography>
                  <Button
                    startIcon={<Add />}
                    onClick={handleAddIndicator}
                    size="small"
                  >
                    Add Indicator
                  </Button>
                </Box>
                {formData.clinicalIndicators.map((indicator, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="e.g., BNP: 850 pg/mL"
                      value={indicator}
                      onChange={(e) => handleIndicatorChange(index, e.target.value)}
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveIndicator(index)}
                      disabled={formData.clinicalIndicators.length === 1}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        )

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Query
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Please review all information before submitting
            </Typography>

            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Patient Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Patient Name</Typography>
                  <Typography variant="body2">{formData.patientName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">MRN</Typography>
                  <Typography variant="body2">{formData.mrn}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Admission Date</Typography>
                  <Typography variant="body2">{formData.admissionDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">DRG</Typography>
                  <Typography variant="body2">
                    Current: {formData.currentDRG} → Potential: {formData.potentialDRG}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Query Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip label={formData.queryType} sx={{ mr: 1 }} />
                <Chip label={formData.priority} color="warning" />
              </Box>
              <Typography variant="body2" paragraph>
                <strong>Subject:</strong> {formData.subject}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Description:</strong> {formData.description}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Due Date:</strong> {formData.dueDate}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>Clinical Indicators:</Typography>
              <List dense>
                {formData.clinicalIndicators.filter(i => i.trim()).map((indicator, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={indicator} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/queries')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          Create New Query
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  startIcon={<Save />}
                  onClick={() => alert('Query saved as draft')}
                >
                  Save Draft
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handleSubmit}
                >
                  Submit Query
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
