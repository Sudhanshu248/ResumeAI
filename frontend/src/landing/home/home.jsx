import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className="home-container">
                <div className="home-row">
                    <h1>Start <span className='home-grad'>building a Resume</span> for  <br />your next Job</h1>
                    <div style={{ fontSize: "21px" }} className='home-text'>Create. Perfect. Stand Out. With Smart Resume Tools</div>
                    <div className="home-btn">

                        <Button variant="contained"> 
                        <Link class="nav-link" to="/dashboard" >Get Started</Link>
                        </Button>
                        <Button variant="outlined">
                        <Link class="nav-link" to="#" >More</Link>
                        </Button>

                    </div>
                </div>
            </div>
        </>
    )
}