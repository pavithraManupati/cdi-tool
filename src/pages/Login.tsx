import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  Chip,
  Stack
} from '@mui/material'
import { LocalHospital } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = login(email, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid credentials. Please use demo credentials below.')
    }
  }

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    login(demoEmail, demoPassword)
    navigate('/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 450, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LocalHospital sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight="bold">
              CDI Tool
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clinical Documentation Improvement System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>
            <Chip label="Demo Accounts" size="small" />
          </Divider>

          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="primary">
                CDI Specialist View
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email: cdi@demo.com | Password: cdi123
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('cdi@demo.com', 'cdi123')}
              >
                Login as CDI Specialist
              </Button>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold" color="secondary">
                Physician View
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Email: doctor@demo.com | Password: doctor123
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => handleDemoLogin('doctor@demo.com', 'doctor123')}
              >
                Login as Physician
              </Button>
            </Box>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, textAlign: 'center' }}>
            This is a demo system. Use the credentials above to explore different views.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
