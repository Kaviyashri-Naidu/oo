import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Otp from './Pages/Otp'
import ResendOtp from './Pages/ResendOtp'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/resend" element={<ResendOtp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  )
}

export default App