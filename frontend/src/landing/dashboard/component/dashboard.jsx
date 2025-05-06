import AddResume from "./addResume"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ResumeCard from "./resumeCard";
import { useResume } from '../../context/ResumeContext';

export default function Dashboard() {

  const { resumes, createResume } = useResume();

  const [open, setOpen] = React.useState(false);
  const [newResumeTitle, setNewResumeTitle] = React.useState('');
  const [loader, setLoader] = React.useState(false);

  const navigate = useNavigate();

  const onCreateResume = async () => {
    try {
      setLoader(true);
      const newResume = {
        title: newResumeTitle,
        createdAt: new Date().toISOString()
      };
      const created = await createResume(newResume);
      setOpen(false);
      if (created && created._id) {
        navigate(`/resume/${created._id}/edit`);
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
          <div className="col " onClick={handleClickOpen}>
            <AddResume />
          </div>

          {resumes.length > 0 && resumes.map((resume) => (
            <div className="col card-logo-1" key={resume._id} onClick={() => { navigate(`/resume/${resume._id}/view`) }}>
              <ResumeCard resume={resume} />
            </div>
          ))}

        </div>
       </div>

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
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" disabled={!newResumeTitle} onClick={onCreateResume} autoFocus>
              {loader ? <CircularProgress /> : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
