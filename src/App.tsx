import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import QueryList from './pages/QueryList'
import QueryDetail from './pages/QueryDetail'
import CreateQuery from './pages/CreateQuery'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/queries" element={<QueryList />} />
          <Route path="/queries/:id" element={<QueryDetail />} />
          <Route path="/queries/new" element={<CreateQuery />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
