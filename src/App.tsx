import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home';
import { UserProfile } from './components/UserProfile'
import './App.css'

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Juan Pérez', email: 'juan@ejemplo.com' })

  const handleSave = (name: string, email: string, password?: string) => {
    setUser({ name, email })
    console.log('Usuario actualizado:', { name, email, password: password ? '***' : 'sin cambio' })
    alert('¡Perfil actualizado exitosamente!')
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route 
        path="/profile" 
        element={
          <UserProfile 
            user={user} 
            onSave={handleSave} 
            onBack={() => navigate('/dashboard')} 
          />
        } 
      />
    </Routes>
  );
}

export default App
