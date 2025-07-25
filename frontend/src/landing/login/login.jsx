import './login.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../axiosConfig';

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${BASE_URL}/login`, {
        email: email.trim(),
        password: password.trim(),
      },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10-second timeout
        });


      if (response.data && response.data.token) {
        // Validate token format before storing
        const token = response.data.token;
        if (!token) {
          throw new Error('Invalid token received from server');
        }

        // Store token with proper formatting
        const formattedToken = token;
        localStorage.setItem('token', formattedToken);
        toast.success("Login successful!");
        navigate('/dashboard');

      } else {
        setError("Invalid credentials. Please try again.");
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message === 'Invalid token received from server') {
        setError("Authentication error. Please try again.");
      } else {
        setError("An error occurred while trying to log in. Please try again later.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <div className="resume-cards box-form  pe-4 ps-4 pt-5 pb-5" style={{ height: "fit-content" }}>
          <div className='box-form-h3 d-flex justify-content-center mb-3  border-top-0 border-start-0 border-end-0 border-dark'>
            <h3 style={{ fontFamily: "'Poppins', sans-serif" }}>Log In </h3>
          </div>

          <p>{error && <div className="alert alert-danger">{error}</div>}</p>

          <div className="input-box h-100 ">
            <input type="email" id="email" placeholder="Enter your email" className='mb-5 mt-3'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" id="password" placeholder="Enter your password" className='mb-5 mt-3'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-btn mt-2 mb-3">
            <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
              Login
            </Button>
          </div>
        </div>
    </>
  )
}   
