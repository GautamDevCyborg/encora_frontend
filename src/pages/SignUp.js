import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import '../assets/NewFiles/Css/SignupPage.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Extract username from email
      const username = data.email.split('@')[0];

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/signup`, {
        email: data.email,
        password: data.password,
        username, // Include the username in the post data
      });
      toast.success('Signup successful! You can now log in.');
      // Optionally redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Signup failed: ${error.response.data.message}`);
      } else {
        toast.error('Signup failed: An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signup-form-group">
            <label>Email</label>
            <input type="email" {...register('email')} placeholder="Enter your email" />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="signup-form-group">
            <label>Password</label>
            <input type="password" {...register('password')} placeholder="Enter your password" />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="signup-form-group">
            <label>Confirm Password</label>
            <input type="password" {...register('confirmPassword')} placeholder="Confirm your password" />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className='signup-navigation'>
          <p>Already have an account? </p><Link to="/login" className="option-link">Login</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
