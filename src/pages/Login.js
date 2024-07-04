import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/NewFiles/Css/LoginPage.css';
import { AddressContext } from '../contexts/AddressContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn, setProfilePicture } = useContext(AddressContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/signin`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Login successful');
        setLoggedIn(true);
        setProfilePicture(response.data.profilePicture);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Login failed: ${error.response.data.message}`);
      } else {
        toast.error('Login failed: An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-options">
          <Link to="/forget-password" className="option-link">Forgot Password?</Link>
          <Link to="/signup" className="option-link">Sign Up</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
