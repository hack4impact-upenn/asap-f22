import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

export default function PopupWarning() {
  return (
    <Alert severity="error">
      <AlertTitle>Warning</AlertTitle>
      Changing this answer will lose all progress made on following questions!
    </Alert>
  );
}
