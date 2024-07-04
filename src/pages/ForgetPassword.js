import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/NewFiles/Css/ForgetPasswordPage.css';

const ForgetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = () => {
    // Implement send OTP logic here
    setStep(2);
  };

  const handleResetPassword = () => {
    // Implement reset password logic here
    setStep(3);
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-form">
        <h2>Forget Password</h2>
        {step === 1 && (
          <>
            <div className="forget-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button onClick={handleSendOtp} className="send-otp-button">Send OTP</button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="forget-form-group">
              <label>OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="forget-form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={handleResetPassword} className="reset-password-button">Reset Password</button>
          </>
        )}
        {step === 3 &&<div style={{fontWeight:"bold"}}> Password reset successfully! <a href='/login' >Login Now</a></div>}

        <div className='forget-navigation'>
        <p>Already have an account? </p><Link to="/login" className="option-link">login</Link>
        <p> Or </p><Link to="/Signup" className="option-link">Sign up Here</Link>
        </div>
      </div>
    
    </div>
  );
};

export default ForgetPasswordPage;
