'use client';

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

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = await getUsersProfile();
      setData(dummyData);
    };
    fetchData();
  }, []);

  const handleStatusChange = (index: number, newStatus: boolean) => {
    const updatedData = [...data];
    updatedData[index].is_verified = newStatus;
    setData(updatedData);
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
                          ? 'bg-red-200 text-red-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {user.is_verified === true ? 'Pending' : 'Selesai'}
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
                      <option value='completed'>Selesai</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
