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



  const onCreateResume = async () => {
    try {
      setLoader(true);
      const uuid = uuidv4();
      setResumeId(uuid);
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
