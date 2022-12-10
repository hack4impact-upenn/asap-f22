import * as React from 'react';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

function StartOverButton() {
  const [isHover, setIsHover] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const navigate = useNavigate();

  async function handleNav() {
    navigate('/home');
  }

  return (
    <ConfirmationModal
      buttonText="RESTART"
      title="Are you sure you want to start over?"
      body="You will lose all progress and return to the home page."
      onConfirm={() => handleNav()}
    />
  );
}

export default StartOverButton;
