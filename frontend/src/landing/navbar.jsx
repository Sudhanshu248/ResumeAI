import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="navbar-container sticky-top ">
      <div className="nav-row">

        <div className="nav-col-1" onClick={handleClick}>
          <img src="/image/logo.png"  className="logo-image" alt="Company Logo"/>
        </div>

        <div className="nav-col-2 me-3">
          <Button variant="outlined">
            <Link className="nav-link" to="/signin">Login</Link>
          </Button>
          <Button variant="contained">
            <Link className="nav-link" to="/signin">Get Started</Link>
          </Button>
          <Button variant="contained">
            <Link className="nav-link" to="/dashboard">Analysor</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
