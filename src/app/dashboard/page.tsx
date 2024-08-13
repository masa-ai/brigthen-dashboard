import React from 'react';

import UserTable from '@/components/BrigthenDashboard';
import Navbar from '@/components/Navbar';

const UsersPage = () => {
  return (
    <>
      <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <Navbar />
      </div>
      <div style={{ marginTop: '60px' }}>
        <UserTable />
      </div>
    </>
  );
};

export default UsersPage;
