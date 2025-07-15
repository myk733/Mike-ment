import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import InputScreen from './components/InputScreen'
import Solutions from './components/Solutions'
import Journal from './components/Journal'
import Profile from './components/Profile'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import Onboarding from './components/Onboarding'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Apply dark mode by default
    document.documentElement.classList.add('dark')
    
    // Check for existing user session
    const savedUser = localStorage.getItem('mikecare_user')
    const hasCompletedOnboarding = localStorage.getItem('mikecare_onboarding')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    
    if (hasCompletedOnboarding) {
      setIsFirstTime(false)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("mikecare_user", JSON.stringify(userData))
  }

  const handleOnboardingComplete = () => {
    setIsFirstTime(false)
    localStorage.setItem('mikecare_onboarding', 'completed')
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('mikecare_user')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (isFirstTime) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/input" element={<InputScreen />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

