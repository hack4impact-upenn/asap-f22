import * as React from 'react';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

interface StartOverButtonProps {
  onClick: any;
}
function StartOverButton(props: StartOverButtonProps) {
  const { onClick } = props;

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
      body="This action is permanent. You will return to the home page."
      onConfirm={() => handleNav()}
    />
  );
}

export default StartOverButton;
