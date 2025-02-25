import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

function StartOverButton() {
  const navigate = useNavigate();

  async function handleNav() {
    navigate('/home');
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleNav();
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          backgroundColor: '#EEEEEE',
          color: 'rgba(0, 0, 0, 0.87)',
          position: 'fixed',
          right: '5%',
          bottom: '15%',
          width: '100px',
        }}
      >
        RESTART
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography variant="h6" paddingTop={3} paddingLeft={3}>
          Are you sure you want to start over?
        </Typography>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose all progress and return to the home page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StartOverButton;
