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
  LinearProgress
} from '@mui/material'
import {
  TrendingUp,
  Schedule,
  CheckCircle,
  Warning,
  AttachMoney
} from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { dashboardStats, mockQueries } from '../data/mockData'
import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Dashboard() {
  const { user } = useAuth()
  
  const queryStatusData = [
    { name: 'Open', value: mockQueries.filter(q => q.status === 'Open').length },
    { name: 'Pending', value: mockQueries.filter(q => q.status === 'Pending').length },
    { name: 'Resolved', value: mockQueries.filter(q => q.status === 'Resolved').length },
    { name: 'Escalated', value: mockQueries.filter(q => q.status === 'Escalated').length },
  ]

  const queryTypeData = [
    { name: 'Specificity', count: mockQueries.filter(q => q.queryType === 'Specificity').length },
    { name: 'Missing Doc', count: mockQueries.filter(q => q.queryType === 'Missing Documentation').length },
    { name: 'Clarification', count: mockQueries.filter(q => q.queryType === 'Clarification').length },
    { name: 'Validation', count: mockQueries.filter(q => q.queryType === 'Clinical Validation').length },
  ]

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
              p: 1,
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

  const urgentQueries = mockQueries
    .filter(q => q.priority === 'High' || q.priority === 'Critical')
    .filter(q => q.status !== 'Resolved')
    .slice(0, 5)

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {user?.name}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Active Queries"
            value={dashboardStats.totalQueries}
            subtitle="Across all statuses"
            icon={<TrendingUp sx={{ color: '#1976d2', fontSize: 32 }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Open Queries"
            value={dashboardStats.openQueries}
            subtitle="Awaiting response"
            icon={<Schedule sx={{ color: '#ed6c02', fontSize: 32 }} />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Resolved Today"
            value={dashboardStats.resolvedToday}
            subtitle="Great progress!"
            icon={<CheckCircle sx={{ color: '#2e7d32', fontSize: 32 }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue Impact"
            value={`$${(dashboardStats.revenueImpact / 1000).toFixed(0)}K`}
            subtitle="Potential captured"
            icon={<AttachMoney sx={{ color: '#2e7d32', fontSize: 32 }} />}
            color="#2e7d32"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Query Types Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={queryTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Query Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={queryStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {queryStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Urgent Queries and Performance Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              High Priority Queries
            </Typography>
            <List>
              {urgentQueries.map((query) => (
                <ListItem
                  key={query.id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1">{query.subject}</Typography>
                        <Chip
                          label={query.priority}
                          size="small"
                          color={query.priority === 'Critical' ? 'error' : 'warning'}
                        />
                        <Chip
                          label={query.status}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Patient: {query.patientName} | MRN: {query.mrn}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Assigned to: {query.assignedTo.name} | Due: {format(new Date(query.dueDate), 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Average Response Time</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {dashboardStats.averageResponseTime} hrs
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(24 - dashboardStats.averageResponseTime) / 24 * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                Target: &lt; 24 hours
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Query Resolution Rate</Typography>
                <Typography variant="body2" fontWeight="bold">
                  78%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={78}
                color="success"
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                Target: &gt; 75%
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Documentation Quality</Typography>
                <Typography variant="body2" fontWeight="bold">
                  85%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={85}
                color="success"
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                Target: &gt; 80%
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, bgcolor: '#e3f2fd' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Warning sx={{ color: '#1976d2', mr: 1 }} />
              <Typography variant="h6">Quick Tips</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              • Respond to queries within 24 hours
            </Typography>
            <Typography variant="body2" paragraph>
              • Use templates for common queries
            </Typography>
            <Typography variant="body2">
              • Review high-impact cases first
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
