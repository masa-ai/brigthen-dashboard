import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

// interface Props {
//   window?: () => Window;
// }

export default function Navbar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav' sx={{ boxShadow: 'none' }}>
        <Toolbar
          sx={{
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href='/dashboard'
            style={{
              paddingLeft: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image src='/images/logo.png' alt='logo' width={100} height={100} />
            <Box
              sx={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}
            >
              <Typography variant='h6' sx={{ color: 'black', fontWeight: 200 }}>
                | Dashboard
              </Typography>
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
