import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./navbar.css";
import "../../App.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../axiosConfig';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState("light-theme");
  const [Username, setUsername] = useState("")

  // Logic of Dark Mode 
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme")
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you store JWT in localStorage

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Username:", response.data.username);
        setUsername(response.data.username)
      } catch (error) {
        console.error("Error loading user:", error.response?.data?.message || error.message);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme])
  // Finish logic


  const handleClick = () => {
    navigate('/');
  };

  const shouldShowSignUp =
    location.pathname === '/' ||
    location.pathname === '/signup' ||
    location.pathname === '/login';

  return (
    <div className="navbar-container sticky-top " id="no-print" >
      <div className="nav-row">

        <div className="nav-col-1" onClick={handleClick}>
          <img src="/image/logo.png" className="logo-image" alt="Company Logo" />
        </div>

        <div className="nav-col-2 m-0">
          {shouldShowSignUp ?
            <Button variant="outlined">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </Button>
            :
            <div>{Username }</div>
          }
          <span className="material-symbols-outlined px-3" style={{ cursor: "pointer", color: "black" }} onClick={toggleTheme}>
            dark_mode
          </span>
        </div>

      </div>
    </div>
  );
}