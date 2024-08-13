'use client';
import { createTheme } from '@mui/material';
import { Figtree } from 'next/font/google';

const font = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-primary',
});

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(255, 187, 13, 1)',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: font.style.fontFamily,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        multiline: {
          padding: '12px',
        },
        root: {
          borderRadius: '8px',
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid var(--color-primary-500)',
            },
            '& .MuiInputBase-input': {
              boxShadow: 'none',
            },
          },
          input: {
            padding: '12px',
          },
        },
      },
    },
  },
});
