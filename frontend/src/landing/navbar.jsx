import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div className="navbar-container p-2 " style={{height:"15vh" , width:"100%" }}>
      <div className="nav-row">
        <div className="nav-col-1 m-3" style={{height:"3rem", width:"12rem"}}>
          <img 
            src="/image/logoipsum-custom-logo.svg" 
            height="3rem" 
            width="12rem" 
            alt="Company Logo" 
          />
        </div>

        <div className="nav-col-2 me-3">
          <Button variant="outlined" >
          <Link  className="nav-link" to="/signin" >Login</Link>
          </Button>
          <Button variant="contained">
            <Link className="nav-link" to="/dashboard" >Get Started</Link>
          </Button>
          <Button variant="contained"> 
            <Link className="nav-link" to="/dashboard"> Analysor</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}