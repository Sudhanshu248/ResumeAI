import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "../../App.css"
import "./home.css";

import { useEffect, useState } from 'react';

export default function Home() {

    return (
        <>
            <div className="home-container ">
                <div className="home-row ">
                    <h1 style={{marginTop: "18vh"}}>Start <span className='home-grad'>building a Resume</span> for  <br />your next Job</h1>
                    <div style={{ fontSize: "21px" }} className='home-text'>Create. Perfect. Stand Out. With Smart Resume Tools</div>
                    <div className="home-btn">

                        <Button variant="contained"> 
                        <Link className="nav-link" to="/signup" >Get Started</Link>
                        </Button>
                      
                        

                    </div>
                </div>
            </div>
        </>
    )
}