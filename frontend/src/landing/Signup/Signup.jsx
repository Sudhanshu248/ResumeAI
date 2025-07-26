import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../axiosConfig';

export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            setLoading(true);
            setError("");

            if (!name || !username || !email || !password) {
                setError("All fields are required.");
                setLoading(false);
                return;
            }

            const response = await axios.post(`${BASE_URL}/signup`, {
                name: name,
                username: username,
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000 // 10 second timeout
            });

            if (response.data && response.data.token) {
                // Validate token format before storing
                const token = response.data.token;
                if (!token) {
                    throw new Error('Invalid token received from server');
                }
                // Store token with proper formatting
                localStorage.setItem('token', token);
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

    return (
        <>

            {/* Main container for the signup form */}
            <div className="resume-cards box-form  pe-4 ps-4 pt-5 " style={{ height: "fit-content" }}>

                <div className='box-form-h3 d-flex justify-content-center mb-3  border-top-0 border-start-0 border-end-0 border-dark'>
                    <h3 style={{ fontFamily: "'Poppins', sans-serif" }} className=''>Sign Up </h3>
                </div>

                {/* Error message display if signup fails */}
                <div>{error && <div className="alert alert-danger">{error}</div>}</div>

                {/* Input fields for user registration */}
                <div className="input-box h-100 ">
                    <input type="name" id="name" placeholder="Enter your name" className='mb-5 mt-3'
                        onChange={(e) => setName(e.target.value)} />
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

                {/* Sign Up button */}
                <div className="login-btn mt-2 mb-3">
                    <Button variant="contained" color="primary" onClick={handleSignUp} disabled={loading}>
                        Sign Up
                    </Button>
                </div>


                {/* Link to navigate to login page if already registered */}
                <div className='d-flex justify-content-center ' style={{ marginBottom: "10px" }}>
                    <div className=''>
                        <p>Already have an account? &nbsp;</p>
                    </div>

                    <Button type="button" className='login-button pt-0'>
                        <Link to="/login" style={{ textDecoration: "none", fontWeight: "bold" }}>
                            Log In
                        </Link>
                    </Button>
                </div>
            </div>
        </>
    )
}