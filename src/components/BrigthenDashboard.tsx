'use client';

import TablePagination from '@mui/material/TablePagination';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import { getUsersProfile } from '@/api/dashboardApi';

interface User {
  created_at: string;
  full_name: string;
  email: string;
  is_verified: boolean;
}

const UserTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Add this line
  const token = Cookies.get('token');
  const limit = rowsPerPage; // Update this line

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsersProfile(token, limit, page * limit);
      setData(response.users);
      setTotalRows(response.total_rows);
    };
    fetchData();
  }, [token, page, limit]);

  const handleStatusChange = async (index: number, newStatus: boolean) => {
    const updatedData = [...data];
    updatedData[index].is_verified = newStatus;
    setData(updatedData);

    // Send is_verified and email to the server
    // const { email, is_verified } = updatedData[index];
    // await updateUserStatus(email, is_verified);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Semua User</h1>
        <table className='min-w-full bg-white rounded-lg shadow'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left'>Date & Time</th>
              <th className='py-2 px-4 border-b text-left'>Nama</th>
              <th className='py-2 px-4 border-b text-left'>Email</th>
              <th className='py-2 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className='py-2 px-4 border-b'>{user.created_at}</td>
                <td className='py-2 px-4 border-b'>{user.full_name}</td>
                <td className='py-2 px-4 border-b'>{user.email}</td>
                <td className='py-2 px-4 border-b'>
                  <div className='relative'>
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        user.is_verified === true
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {user.is_verified === true ? 'Verified' : 'Pending'}
                    </span>
                    <select
                      className='absolute inset-0 opacity-0 cursor-pointer'
                      value={user.is_verified ? 'completed' : 'pending'}
                      onChange={(e) =>
                        handleStatusChange(
                          index,
                          e.target.value === 'completed'
                        )
                      }
                    >
                      <option value='pending'>Pending</option>
                      <option value='completed'>Verified</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          component='div'
          count={totalRows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default UserTable;
