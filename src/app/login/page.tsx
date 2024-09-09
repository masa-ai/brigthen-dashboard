import { Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { LoginComponent } from '@/components/LoginComponent';

export default function Login() {
  return (
    <main className='flex flex-col items-center justify-center h-full w-full'>
      <Toolbar sx={{ width: '100%' }}>
        <Link href='/'>
          <Image src='/images/logo.png' alt='logo' width={100} height={100} />
        </Link>
      </Toolbar>
      <div className='h-[calc(100vh-64px)]'>
        <LoginComponent />
      </div>
    </main>
  );
}
