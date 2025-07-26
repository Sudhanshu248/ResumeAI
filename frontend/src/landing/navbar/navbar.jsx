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

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme")
    }
  }

  // Load user data from backend on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you store JWT in localStorage

        if (!token) {
          console.error("No token found");

          return;
        }

        const response = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(response.data.username)
      } catch (error) {
        console.error("Error loading user:", error.response?.data?.message || error.message);
      }
    };

    loadData();
  }, []);

  // Apply theme to the entire document body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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

        {/* Navigation and theme toggle column */}
        <div className="nav-col-2 m-0">
          {shouldShowSignUp ?
            <Button variant="outlined">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </Button>
            :
            <div className='user'>
              <img src="/image/user.png" alt="Default User Image" width="10px"/>
              <div style={{color: "black"}}>{Username }</div>
            </div>

          }


          {/* Dark mode toggle icon */}
          <span className="material-symbols-outlined px-3" style={{ cursor: "pointer", color: "black" }} onClick={toggleTheme}>
            dark_mode
          </span>
        </div>

      </div>
    </div>
  );
}