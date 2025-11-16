import { useNavigate } from 'react-router-dom'
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
  LinearProgress
} from '@mui/material'
import {
  Psychology,
  CheckCircle,
  TrendingUp,
  AttachMoney
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { aiCodingSuggestions } from '../data/aiCodingData'
import { CodingSuggestion } from '../types'

export default function CoderDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handlePatientSelect = (patient: CodingSuggestion) => {
    // Navigate to dedicated patient coding page
    navigate(`/patient/${patient.patientId}`)
  }

  const getStatusChip = (patient: CodingSuggestion) => {
    const hasSelectedCodes = patient.diagnosisCodes.some(d => d.isSelected) || 
                             patient.cptCodes.some(c => c.isSelected)
    if (patient.dischargeDate && hasSelectedCodes) {
      return <Chip label="Coded" size="small" color="success" />
    } else if (patient.dischargeDate) {
      return <Chip label="Ready to Code" size="small" color="primary" />
    } else {
      return <Chip label="In Progress" size="small" color="warning" />
    }
  }

  const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'success'
    if (confidence >= 0.75) return 'primary'
    if (confidence >= 0.6) return 'warning'
    return 'error'
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          AI-Powered Coding Workspace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.name} - Select a case to begin coding
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Cases"
            value={aiCodingSuggestions.length}
            subtitle="Ready to code"
            icon={<CheckCircle sx={{ color: '#1976d2', fontSize: 40 }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Cases Coded Today"
            value="0"
            subtitle="Great progress!"
            icon={<TrendingUp sx={{ color: '#2e7d32', fontSize: 40 }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg AI Confidence"
            value="91%"
            subtitle="High accuracy"
            icon={<Psychology sx={{ color: '#9c27b0', fontSize: 40 }} />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue Today"
            value="$0K"
            subtitle="Cases coded"
            icon={<AttachMoney sx={{ color: '#2e7d32', fontSize: 40 }} />}
            color="#2e7d32"
          />
        </Grid>
      </Grid>

      {/* Patient Cases Table */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            Patient Cases Awaiting Coding
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>MRN</TableCell>
                <TableCell>Admission Date</TableCell>
                <TableCell>Discharge Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>AI Confidence</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aiCodingSuggestions.map((patient) => {
                const avgConfidence = Math.round(
                  (patient.diagnosisCodes.reduce((sum, d) => sum + d.confidence, 0) / 
                   patient.diagnosisCodes.length) * 100
                )
                return (
                  <TableRow
                    key={patient.patientId}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {patient.patientName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{patient.mrn}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(patient.admissionDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {patient.dischargeDate 
                          ? new Date(patient.dischargeDate).toLocaleDateString()
                          : 'In Progress'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(patient)}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 80 }}>
                          <LinearProgress
                            variant="determinate"
                            value={avgConfidence}
                            color={getConfidenceColor(avgConfidence / 100)}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight="bold">
                          {avgConfidence}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePatientSelect(patient)
                        }}
                      >
                        Code Patient
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
