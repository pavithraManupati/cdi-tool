import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Tooltip
} from '@mui/material'
import {
  Search,
  Visibility,
  FilterList,
  Add
} from '@mui/icons-material'
import { format } from 'date-fns'
import { mockQueries } from '../data/mockData'
import { Query, QueryStatus, QueryType, Priority } from '../types'

export default function QueryList() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<QueryStatus | 'All'>('All')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All')
  const [typeFilter, setTypeFilter] = useState<QueryType | 'All'>('All')

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'Critical': return 'error'
      case 'High': return 'warning'
      case 'Medium': return 'info'
      case 'Low': return 'default'
      default: return 'default'
    }
  }

  const filteredQueries = mockQueries.filter((query) => {
    const matchesSearch = 
      query.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || query.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || query.priority === priorityFilter
    const matchesType = typeFilter === 'All' || query.queryType === typeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Query Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/queries/new')}
        >
          New Query
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search queries..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value as QueryStatus | 'All')}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Escalated">Escalated</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value as Priority | 'All')}
            >
              <MenuItem value="All">All Priorities</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value as QueryType | 'All')}
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Specificity">Specificity</MenuItem>
              <MenuItem value="Missing Documentation">Missing Documentation</MenuItem>
              <MenuItem value="Clarification">Clarification</MenuItem>
              <MenuItem value="Clinical Validation">Clinical Validation</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Advanced Filters">
            <IconButton color="primary">
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredQueries.length} of {mockQueries.length} queries
          </Typography>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell><strong>Query ID</strong></TableCell>
              <TableCell><strong>Patient</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Priority</strong></TableCell>
              <TableCell><strong>Assigned To</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Revenue Impact</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQueries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((query) => (
                <TableRow
                  key={query.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/queries/${query.id}`)}
                >
                  <TableCell>{query.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{query.patientName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      MRN: {query.mrn}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {query.subject}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {query.queryType}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={query.status}
                      color={getStatusColor(query.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={query.priority}
                      color={getPriorityColor(query.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{query.assignedTo.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(new Date(query.dueDate), 'MMM dd, yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={query.revenueImpact && query.revenueImpact > 0 ? 'success.main' : 'text.secondary'}
                      fontWeight={query.revenueImpact && query.revenueImpact > 0 ? 'bold' : 'normal'}
                    >
                      ${query.revenueImpact?.toLocaleString() || '0'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/queries/${query.id}`)
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredQueries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}
