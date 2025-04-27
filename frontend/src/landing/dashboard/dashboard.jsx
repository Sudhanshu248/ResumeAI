import AddResume from "./component/addResume"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import { v4 as uuidv4 } from 'uuid';

import CircularProgress from '@mui/material/CircularProgress';

export default function Dashboard() {
 
  const [open, setOpen] = React.useState(false);
  const [resumeTitle, setResumeTitle] = React.useState('');
  const [resumeId, setResumeId] = React.useState('');
  const [loader, setLoader] = React.useState(false);

  const onCreateResume = async () => {
    try {
      setLoader(true);
      const uuid = uuidv4();
      setResumeId(uuid);
      console.log('Creating resume:', { title: resumeTitle, id: uuid });
      
      setOpen(false);
      
    } catch (error) {
      console.error('Error creating resume:', error);
    } finally {
      setLoader(false);
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

        <div className="row">
          <div className="col" onClick={() => { handleClickOpen() }}>
            <AddResume />
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
                <Input type="text" placeholder="Enter title"  style={{ height: '3rem', width: '23rem' }} onChange={(e) => { setResumeTitle(e.target.value) }} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>Cancle</Button>
              <Button  variant="contained" disabled={!resumeTitle} onClick={onCreateResume} autoFocus>
                {loader ? <CircularProgress /> : "Create"}
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </>
  )
}
