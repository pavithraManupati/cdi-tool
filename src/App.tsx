import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import PhysicianDashboard from './pages/PhysicianDashboard'
import QueryList from './pages/QueryList'
import QueryDetail from './pages/QueryDetail'
import CreateQuery from './pages/CreateQuery'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function DashboardRouter() {
  const { user } = useAuth()
  
  // Show different dashboard based on user role
  if (user?.role === 'Physician') {
    return <PhysicianDashboard />
  }
  return <Dashboard />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardRouter />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/queries"
        element={
          <ProtectedRoute>
            <Layout>
              <QueryList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/queries/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <QueryDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/queries/new"
        element={
          <ProtectedRoute>
            <Layout>
              <CreateQuery />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
