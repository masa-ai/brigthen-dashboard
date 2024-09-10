'use client';

import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { parseJwt } from '@/lib/helper';

import { BaseButton, UnderlineButton } from '@/components/Button';
import { ModalForgot } from '@/components/LoginComponent/ModalForgot';

import { loginUserAPI } from '@/api/authApi';

export const LoginComponent = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      await toast
        .promise(loginUserAPI(values.username, values.password), {
          pending: 'Login in progress...',
          success: 'Login Success!',
          error: {
            render: async ({
              data,
            }: {
              data: { response: { status: number; data: { detail: string } } };
            }) => {
              if (data?.response?.status == 401) {
                await axios.post(
                  `${process.env.NEXT_PUBLIC_API_ENDPOINT_CORE}/users/organization/auth/request-verify-token`,
                  { email: values.username }
                );
              }
              if (data?.response?.data?.detail) {
                return `${data.response.data.detail}`;
              }
              return `Login Failed!`;
            },
          },
        })
        .then((response: { access_token: string }) => {
          const parsedToken = parseJwt(response.access_token);
          const expireDate = parsedToken.exp;
          setCookie('username', values.username, { maxAge: expireDate });
          setCookie('token', response.access_token, { maxAge: expireDate });
          setCookie('userID', parsedToken.sub, { maxAge: expireDate });
          window.location.href = '/dashboard';
        });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-full'>
      <Typography variant='h4' fontWeight={700} textAlign='center'>
        Log In
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
          id='username'
          placeholder='Enter your email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.username}
          variant='outlined'
          fullWidth
          required
        />
        <Typography variant='body1' sx={{ margin: '20px 0 10px' }}>
          Password
        </Typography>
        <FormControl fullWidth variant='outlined'>
          <OutlinedInput
            required
            id='password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </IconButton>
              </InputAdornment>
            }
            placeholder='Enter your Password'
            onChange={formik.handleChange}
            value={formik.values.password}
            notched={false}
          />
        </FormControl>
        <div className='flex justify-end'>
          <UnderlineButton onClick={() => setOpenModal(true)}>
            Lupa password?
          </UnderlineButton>
        </div>
        <BaseButton
          variant='contained'
          size='medium'
          type='submit'
          sx={{ marginTop: '20px' }}
          fullWidth
        >
          Login
        </BaseButton>
      </form>
      <div className='flex justify-center items-center'>
        <Link href='/signup' passHref>
          <BaseButton className='hover:bg-transparent' disableTouchRipple>
            <span className='border-b border-primary-500 text-black font-semibold text-base'>
              Sign Up
            </span>
          </BaseButton>
        </Link>
      </div>
      <ModalForgot open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};
