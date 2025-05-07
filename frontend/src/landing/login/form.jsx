import './form.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {clientServer} from '../../../config';

export default function Form() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleAction = () => {
    setIsRegistered(true);
  }

const handleSignUp = async () => {

    try {
        setLoading(true);
        setError("");

        // Validate inputs
        if (!name || !username || !email || !password) {
            setError("All fields are required.");
            setLoading(false);
            return;
        }

        const response = await clientServer.post("/signin", {
            name: name,
            username: username,
            email: email,
            password: password,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 10000 // 10 second timeout
        });

        if (response.data && response.data.token) {
            // Validate token format before storing
            const token = response.data.token;
            if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
                throw new Error('Invalid token received from server');
            }
            
            // Store token with proper formatting
            localStorage.setItem('token', token.trim());
            toast.success("Account created successfully!");
            navigate('/dashboard');
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else if (error.message === 'Invalid token received from server') {
            setError("Authentication error. Please try again.");
        } else if (error.code === 'ERR_NETWORK') {
            setError("Network error. Please check if the server is running.");
        } else {
            setError("An error occurred during signup. Please try again later.");
        }

    } finally {
        setLoading(false);
    }
}

const handleLogin = async () => {
  if (!email || !password) {
      setError("Email and password are required.");
      return;
  }

  try {
      setLoading(true);
      setError("");

      const response = await clientServer.post(`/login`, {
          email: email.trim(),
          password: password.trim(),
      }, 
      {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          timeout: 10000, // 10-second timeout
      });

      if (response.data && response.data.token) {
          // Validate token format before storing
          const token = response.data.token;
          if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
              throw new Error('Invalid token received from server');
          }
          
          // Store token with proper formatting
          const formattedToken = token.trim();
          localStorage.setItem('token', formattedToken);
          
          // Verify token was stored correctly
          const storedToken = localStorage.getItem('token');
          
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
      {isRegistered  
        
        ? 

        <div className="box-form  pe-4 ps-4 pt-5 pb-5" style={{ height: "fit-content" }}>
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
      
        :
        
        // SignUp page
        <div className="box-form  pe-4 ps-4 pt-5 " style={{ height: "fit-content" }}>

          <div className='box-form-h3 d-flex justify-content-center mb-3  border-top-0 border-start-0 border-end-0 border-dark'>
            <h3 style={{ fontFamily: "'Poppins', sans-serif" }} className=''>Sign Up </h3>
          </div>

          <p>{error && <div className="alert alert-danger">{error}</div>}</p>

          <div className="input-box h-100 ">
              <input type="name" id="name" placeholder="Enter your name" className='mb-5 mt-3' 
              />
              <input type="name" id="username" placeholder="Enter your username" className='mb-5 mt-3'
                onChange={(e) => setUsername(e.target.value)}
              />
              <input type="email" id="email" placeholder="Enter your email" className='mb-5 mt-3'
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="password" id="password" placeholder="Enter your password" className='mb-5 mt-3'
                onChange={(e) => setPassword(e.target.value)} 
              />
          </div>

          <div className="login-btn mt-2 mb-3">
            <Button variant="contained" color="primary" onClick={handleSignUp} disabled={loading}>
              Sign Up
            </Button>
          </div>

          <div className='d-flex justify-content-center ' style={{marginBottom: "10px"}}>
            <div className=''>
              <p>Already have an account? &nbsp;</p>
            </div>
            
            <Button type="button" onClick={handleAction} style={{ background: 'none', height: "fit-content", border: 'none', padding: 0, margin: "0", color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
              Log In
            </Button>
          </div>
        </div>
      }
    </>
  )
}   
