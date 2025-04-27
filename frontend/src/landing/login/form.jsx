import './index.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("Sending login request:", { email, password });
      
      // Use the correct endpoint - /login instead of /signin
      const response = await axios.post("http://localhost:3002/signin", {
        name: name,
        username: username,
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log("Login response:", response.data);
      
      if (response.data && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
        setError("Error setting up the request: " + error.message);
     
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

      <div className="box-form  pe-4 ps-4 pt-5 pb-5" style={{ height: "fit-content" }}>
        <form action="">

          <div className='box-form-h3 d-flex justify-content-evenly mb-3 border border-top-0 border-start-0 border-end-0 border-dark'>
            <h3 style={{ fontFamily: "'Poppins', sans-serif" }} className=''>Sign Up </h3>
            <div className='border border-1 border-dark'></div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif" }}>Sign In </h3>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="input-box h-100 ">

            {/* <label htmlFor="name"></label> */}
            <input
              type="name"
              id="name"
              placeholder="Enter your name"
              className='mb-5 mt-3'
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
            />
            {/* <label htmlFor="username"></label> */}
            <input
              type="name"
              id="username"
              placeholder="Enter your username"
              className='mb-5 mt-3'
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <label htmlFor="email "></label> */}
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className='mb-5 mt-3'
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <label htmlFor="password"></label> */}
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className='mb-5 mt-3'
              onChange={(e) => setPassword(e.target.value)} />

          </div>

          <div className="login-btn mt-2 mb-3">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className='text-center'>
            <div className='d-flex justify-content-evenly align-items-center'>
              <a href="">Forgot Password?</a>
              <a href="">Don't have an account?</a>
            </div>

            <div className='mt-2 mb-0'>
              <a href="">Sign Up</a>
            </div>
          </div>

        </form>
      </div>
    </>
  )
}   
