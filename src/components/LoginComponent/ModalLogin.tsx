import { Box, Modal } from '@mui/material';
import React from 'react';

import { LoginComponent } from '@/components/LoginComponent';

export const ModalLogin = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    maxWidth: '95%',
    maxHeight: '80%',
    overflow: 'auto',
    overflowX: 'hidden',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'space-between',
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <LoginComponent />
      </Box>
    </Modal>
  );
};
