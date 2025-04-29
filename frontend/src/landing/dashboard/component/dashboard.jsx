import AddResume from "./addResume"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ResumeCard from "./resumeCard";

import { toast } from 'react-toastify';


export default function Dashboard() {

  const [open, setOpen] = React.useState(false);
  const [newResumeTitle, setNewResumeTitle] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [resumeId, setResumeId] = React.useState([]);
  const [Resume, setResume] = React.useState(() => {
    const savedTitles = localStorage.getItem('Resume');
    return savedTitles ? JSON.parse(savedTitles) : [];
  });


  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem('Resume', JSON.stringify(Resume));
  }, [Resume]);

  // Test authentication
  const handleTestAuth = async () => {
    try {
      const result = await testAuth();
      if (result.success) {
        toast.success('Authentication successful!');
      } else {
        toast.error(`Authentication failed: ${result.message}`);
        if (result.status === 401) {
          toast.info('Redirecting to login page...');
          setTimeout(() => navigate('/signin'), 2000);
        }
      }
    } catch (error) {
      console.error('Error testing auth:', error);
      toast.error('Error testing authentication');
    }
  };

  const onCreateResume = async () => {
    try {
      if (!isAuthenticated()) {
        toast.error('You need to login to create a resume');
        navigate('/signin');
        return;
      }

      setLoader(true);
      const uuid = uuidv4();
      setResumeId(uuid);
      
      // Test authentication before making the request
      const authTest = await testAuth();
      if (!authTest.success) {
        toast.error(`Authentication failed: ${authTest.message}`);
        if (authTest.status === 401) {
          toast.info('Redirecting to login page...');
          setTimeout(() => navigate('/signin'), 2000);
        }
        return;
      }

      // Get the token directly to ensure it's available
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token is missing');
        navigate('/signin');
        return;
      }
      
      // Make API call to create resume using auth headers
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      console.log('Making request with headers:', headers);
      
      const response = await fetch('http://localhost:3002/api/create-resume', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          title: newResumeTitle,
          id: uuid
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          toast.error('Session expired. Please login again.');
          navigate('/signin');
          return;
        }
        throw new Error(errorData.message || 'Failed to create resume');
      }
      
      const data = await response.json();
      console.log('Resume created:', data);
      
      const newResume = {
        id: uuid,
        title: newResumeTitle,
        createdAt: new Date().toISOString()
      };
      setResume([...Resume, newResume]);
      console.log('Creating resume:', newResume);

      setOpen(false);
      if (uuid) {
        navigate(`/resume/${uuid}/edit`);
      }

    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error(error.message || 'Failed to create resume. Please try again.');
    } finally {
      setLoader(false);
      setNewResumeTitle('');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="p-5 ms-3 mt-3">
        <h1 className="fs-3 fw-bold">My Resume </h1>
        <p className="fs-5 opacity-75">Start creating your resume for your next job</p>

        {/* Test Auth Button */}
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleTestAuth}
          className="mb-3"
        >
          Test Authentication
        </Button>

       <div className="container">
       <div className="row d-flex flex-wrap">
          <div className="col " onClick={() => { handleClickOpen() }}>
            <AddResume />
          </div>
          
            {Resume.length > 0 && Resume.map((resume) => (

            <div className="col card-logo-1" key={resume.id} onClick={() => { navigate(`/resume/${resume.id}/view`) }}>
              <ResumeCard resume={resume} />
            </div>
          ))}

        </div>
       </div>

        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Create New Resume"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p>  Add new title for your resume</p>
                <Input
                  type="text"
                  placeholder="Enter title"
                  style={{ height: '3rem', width: '23rem' }}
                  value={newResumeTitle}
                  onChange={(e) => { setNewResumeTitle(e.target.value) }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>Cancle</Button>
              <Button variant="contained" disabled={!newResumeTitle} onClick={onCreateResume} autoFocus>
                {loader ? <CircularProgress /> : "Create"}
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </>
  )
}
