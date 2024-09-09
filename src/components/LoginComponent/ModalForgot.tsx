import { Box, Modal, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

import { BaseButton } from '@/components/Button';

import { forgotPasswordAPI } from '@/api/authApi';

export const ModalForgot = ({
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
    maxHeight: '80%',
    overflow: 'auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'space-between',
  };

  const { mutateAsync: forgotPassword } = useMutation({
    mutationFn: (email: string) => forgotPasswordAPI({ email }),
    onSuccess: () => {
      toast.success('Check your email for reset password link');
      handleClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      await forgotPassword(values.email);
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className='flex flex-col justify-center items-center gap-4 h-full'>
          <Typography variant='h4' fontWeight={700} textAlign='center'>
            Forgot Password
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className='w-screen px-10 sm:max-w-[450px]'
          >
            <Typography variant='body1' sx={{ margin: '20px 0 10px' }}>
              Email
            </Typography>
            <TextField
              InputLabelProps={{ required: false }}
              id='email'
              placeholder='Enter your email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              variant='outlined'
              fullWidth
              required
            />
            <BaseButton
              variant='contained'
              size='medium'
              type='submit'
              sx={{ marginTop: '20px' }}
              fullWidth
            >
              Change Password
            </BaseButton>
          </form>
        </div>
      </Box>
    </Modal>
  );
};
