import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar
} from '@mui/material'
import {
  Assignment,
  Schedule,
  CheckCircle,
  Warning,
  TrendingDown
} from '@mui/icons-material'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { mockQueries } from '../data/mockData'
import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function PhysicianDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Filter queries assigned to this physician
  const myQueries = mockQueries.filter(q => q.assignedTo.id === user?.id)
  const openQueries = myQueries.filter(q => q.status === 'Open')
  const pendingQueries = myQueries.filter(q => q.status === 'Pending')
  const overdueQueries = myQueries.filter(q => {
    const dueDate = new Date(q.dueDate)
    return dueDate < new Date() && q.status !== 'Resolved'
  })

  // Response time trend data
  const responseData = [
    { day: 'Mon', avgHours: 20 },
    { day: 'Tue', avgHours: 18 },
    { day: 'Wed', avgHours: 22 },
    { day: 'Thu', avgHours: 15 },
    { day: 'Fri', avgHours: 17 },
  ]

  const StatCard = ({ title, value, icon, color, subtitle, onClick }: any) => (
    <Card 
      sx={{ 
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { boxShadow: 3 } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h3" component="div" sx={{ mb: 1 }}>
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

  const urgentQueries = myQueries
    .filter(q => (q.priority === 'High' || q.priority === 'Critical') && q.status !== 'Resolved')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name?.split(' ')[1]}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's your query overview for today
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate('/queries')}
        >
          View All Queries
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Queries Assigned"
            value={myQueries.length}
            subtitle="Total queries"
            icon={<Assignment sx={{ color: '#1976d2', fontSize: 40 }} />}
            color="#1976d2"
            onClick={() => navigate('/queries')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Awaiting Response"
            value={openQueries.length}
            subtitle="Need your attention"
            icon={<Schedule sx={{ color: '#ed6c02', fontSize: 40 }} />}
            color="#ed6c02"
            onClick={() => navigate('/queries')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Under Review"
            value={pendingQueries.length}
            subtitle="In progress"
            icon={<CheckCircle sx={{ color: '#2e7d32', fontSize: 40 }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overdue"
            value={overdueQueries.length}
            subtitle={overdueQueries.length > 0 ? "Action required" : "All caught up!"}
            icon={<Warning sx={{ color: overdueQueries.length > 0 ? '#d32f2f' : '#9e9e9e', fontSize: 40 }} />}
            color={overdueQueries.length > 0 ? '#d32f2f' : '#9e9e9e'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Urgent Queries List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Queries Requiring Your Response
            </Typography>
            {urgentQueries.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  All caught up!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You have no urgent queries at the moment.
                </Typography>
              </Box>
            ) : (
              <List>
                {urgentQueries.map((query) => {
                  const isOverdue = new Date(query.dueDate) < new Date()
                  const daysUntilDue = Math.ceil((new Date(query.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  
                  return (
                    <ListItem
                      key={query.id}
                      sx={{
                        border: '1px solid',
                        borderColor: isOverdue ? 'error.light' : 'divider',
                        borderRadius: 2,
                        mb: 2,
                        bgcolor: isOverdue ? 'error.lighter' : 'background.paper',
                        '&:hover': { 
                          bgcolor: isOverdue ? 'error.light' : 'action.hover',
                          cursor: 'pointer'
                        },
                        flexDirection: 'column',
                        alignItems: 'stretch'
                      }}
                      onClick={() => navigate(`/queries/${query.id}`)}
                    >
                      <Box sx={{ width: '100%', mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 1 }}>
                            <Chip
                              label={query.priority}
                              size="small"
                              color={query.priority === 'Critical' ? 'error' : 'warning'}
                            />
                            <Chip
                              label={query.queryType}
                              size="small"
                              variant="outlined"
                            />
                            {isOverdue && (
                              <Chip
                                label="OVERDUE"
                                size="small"
                                color="error"
                              />
                            )}
                          </Box>
                          <Typography variant="caption" color={isOverdue ? 'error' : 'text.secondary'}>
                            {isOverdue ? `Overdue by ${Math.abs(daysUntilDue)} days` : `Due in ${daysUntilDue} days`}
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {query.subject}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Patient: {query.patientName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            MRN: {query.mrn} | Admission: {format(new Date(query.admissionDate), 'MMM dd, yyyy')}
                          </Typography>
                        </Box>
                        <Button size="small" variant="contained">
                          Respond
                        </Button>
                      </Box>
                    </ListItem>
                  )
                })}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Right Side Panel */}
        <Grid item xs={12} md={4}>
          {/* Response Time Trend */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Response Time
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgHours" stroke="#1976d2" strokeWidth={2} name="Avg Hours" />
              </LineChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
              <Typography variant="body2" fontWeight="bold" color="primary">
                Average: 18.4 hours
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Within target (&lt; 24 hours)
              </Typography>
            </Box>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32, mr: 2 }}>
                  <CheckCircle sx={{ fontSize: 18 }} />
                </Avatar>
                <ListItemText
                  primary={<Typography variant="body2">Query Resolved</Typography>}
                  secondary={<Typography variant="caption">2 hours ago</Typography>}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32, mr: 2 }}>
                  <Schedule sx={{ fontSize: 18 }} />
                </Avatar>
                <ListItemText
                  primary={<Typography variant="body2">New Query Assigned</Typography>}
                  secondary={<Typography variant="caption">5 hours ago</Typography>}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32, mr: 2 }}>
                  <Warning sx={{ fontSize: 18 }} />
                </Avatar>
                <ListItemText
                  primary={<Typography variant="body2">Response Needed</Typography>}
                  secondary={<Typography variant="caption">1 day ago</Typography>}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Quick Tips for Physicians */}
          <Paper sx={{ p: 3, bgcolor: '#fff3e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingDown sx={{ color: '#ed6c02', mr: 1 }} />
              <Typography variant="h6">Quick Tips</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              • Respond to queries within 24 hours to improve documentation quality
            </Typography>
            <Typography variant="body2" paragraph>
              • Be specific with clinical terminology and stages
            </Typography>
            <Typography variant="body2">
              • Review lab values and imaging before responding
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
