import AddResume from "./addResume"
import { useState, useEffect } from 'react';
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
import { useResume } from '../../../context/ResumeContext';
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
  const { resumes, createResume, fetchResumes, deleteResume } = useResume();
  const [open, setOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleDeleteResume = async (resumeId) => {
    try {
      await deleteResume(resumeId);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };


  const onCreateResume = async () => {
    try {
      setLoader(true);
      const newResume = {
        id: uuidv4(), // 👈 Add unique ID here
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadResumes = async () => {
      setLoading(true);
      await fetchResumes();
      setLoading(false);
    };

    loadResumes();
  }, []);


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

            {loading ? (
              <p>Loading resumes...</p>
            ) : resumes.length === 0 ? (
              <p></p>
            ) : (
              resumes.map(resume => (
                <div
                  className="col card-logo-1"
                  key={resume._id}
                  onClick={() => navigate(`/resume/${resume._id}/view`)}
                >
                  <ResumeCard resume={resume} onDelete={handleDeleteResume} />

                </div>
              ))
            )}

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
            <div id="alert-dialog-description">
              <DialogContentText>
                Add new title for your resume
              </DialogContentText>
              <Input
                type="text"
                placeholder="Enter title"
                style={{ height: '3rem', width: '23rem' }}
                value={newResumeTitle}
                onChange={(e) => { setNewResumeTitle(e.target.value) }}
              />
            </div>
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
