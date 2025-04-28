import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./navbar.css";
import "../App.css"
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light-theme");
  

  // Logic of Dark Mode 
  const toggleTheme = () => {
      if(theme === "dark-theme"){
          setTheme("light-theme");
      }else{
          setTheme("dark-theme")
      }
  }

  useEffect(() => {
      document.body.className = theme;
  }, [theme])
  // Finish logic


  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="navbar-container sticky-top ">
      <div className="nav-row">

        <div className="nav-col-1" onClick={handleClick}>
          <img src="/image/logo.png"  className="logo-image" alt="Company Logo"/>
        </div>

        <div className="nav-col-2 m-0">
          <Button variant="outlined">
            <Link className="nav-link" to="/signin">Login</Link>
          </Button>
          <Button variant="contained">
            <Link className="nav-link" to="/signin">Analyser</Link>
          </Button>
          <span className="material-symbols-outlined px-3" style={{cursor: "pointer", color: "black"}} onClick={toggleTheme}>
            dark_mode
          </span>
          
        </div>

      </div>
    </div>
  );
}
