import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const sendOTP = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('otp', otp);
    localStorage.setItem('email', email);

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: 'service_lg6ngkd',
          template_id: 'template_yuybsfo',
          user_id: '04ZIiGhullY0xU1PC',
          template_params: {
            to_email: email,
            otp: otp
          }
        })
      });

      alert('OTP sent to your email');
      navigate('/otp');
    } catch (error) {
      console.error('Failed to send OTP', error);
      alert('Failed to send OTP. Try again.');
    }
  };return(
    <>
    <Header />
    <div className="login-container">
    <div className="login-card">
        <div className="left-panel">
        <h3>Sign In</h3>
        <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
        />
        <button onClick={sendOTP} className="send-otp-btn">
            Send Otp
        </button>
        </div>

        <div className="right-panel">
        <p>Web Application with Analytics Dashboard</p>
        </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Login