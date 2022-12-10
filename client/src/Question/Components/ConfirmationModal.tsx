import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IConfirmModal {
  buttonText: string;
  title: string;
  body: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onConfirm: Function;
}
/**
 * A modal component that displays a confirmation message and a button to confirm the action or cancel the action.
 * @param buttonText - the text to display on the confirmation button
 * @param title - the title of the modal
 * @param body - the body of the modal
 * @param onConfirm - the function to call when the confirmation button is clicked
 */
export default function ConfirmModal({
  buttonText,
  title,
  body,
  onConfirm,
}: IConfirmModal) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          width: '96px',
          height: '39px',
          textTransform: 'none',
          backgroundColor: '#EEEEEE',
          color: 'rgba(0, 0, 0, 0.87)',
          padding: '6px 16px 6px 12px',
          gap: '8px',
          position: 'absolute',
          left: '88.61%',
          right: '4.72%',
          top: '80.45%',
          bottom: '15.74%',
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '14px',
        }}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
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
