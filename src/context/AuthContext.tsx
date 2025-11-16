import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for login
const demoUsers: { email: string; password: string; user: User }[] = [
  {
    email: 'cdi@demo.com',
    password: 'cdi123',
    user: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'CDI Specialist',
      email: 'cdi@demo.com',
      department: 'Clinical Documentation'
    }
  },
  {
    email: 'doctor@demo.com',
    password: 'doctor123',
    user: {
      id: '2',
      name: 'Dr. Michael Chen',
      role: 'Physician',
      email: 'doctor@demo.com',
      department: 'Cardiology'
    }
  },
  {
    email: 'coder@demo.com',
    password: 'coder123',
    user: {
      id: '3',
      name: 'Jennifer Martinez',
      role: 'Clinical Coder',
      email: 'coder@demo.com',
      department: 'Health Information Management'
    }
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (email: string, password: string): boolean => {
    const demoUser = demoUsers.find(
      u => u.email === email && u.password === password
    )
    
    if (demoUser) {
      setUser(demoUser.user)
      localStorage.setItem('currentUser', JSON.stringify(demoUser.user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
