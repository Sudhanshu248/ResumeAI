import Button from '@mui/material/Button';

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
          <Button variant="outlined">Login</Button>
          <Button variant="contained">Get Started</Button>
          <Button variant="contained">Analysis</Button>
        </div>
      </div>
    </div>
  );
}