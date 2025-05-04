import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    let value = e.target.value;
    if (value.length > 1) value = value.slice(0, 1); // Allow only one digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input field
    if (value !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle OTP verification
  const verifyOTP = () => {
    const enteredOtp = otp.join('');
    const storedOtp = localStorage.getItem('otp');

    if (enteredOtp === storedOtp) {
      setIsVerified(true);
      alert('OTP Verified!');
      navigate('/dashboard');  // Redirect to the dashboard or home page
    } else {
      alert('Invalid OTP, please try again.');
    }
  };

  // Resend OTP function
  const resendOTP = async () => {
    const email = localStorage.getItem('email');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('otp', otp);

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_lg6ngkd',
          template_id: 'template_yuybsfo',
          user_id: '04ZIiGhullY0xU1PC',
          template_params: {
            to_email: email,
            otp: otp,
          },
        }),
      });
      alert('OTP resent to your email.');
    } catch (error) {
      console.error('Failed to resend OTP', error);
      alert('Failed to resend OTP. Try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="otp-container">
        <div className="otp-card">
          <div className="left-panel">
            <h3>Enter OTP</h3>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="otp-input"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button onClick={verifyOTP} className="verify-otp-btn">
              Verify OTP
            </button>
            <button onClick={resendOTP} className="resend-otp-btn">
              Resend OTP
            </button>
          </div>

          <div className="right-panel">
            <p>Web Application with Analytics Dashboard</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Otp;
