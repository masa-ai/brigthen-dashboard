// import axios from 'axios';

// const dashboardApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_CORE,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const getUsersProfile = async () => {
  // const response = await dashboardApi.get(
  //   `/sentra_dashboard/all_purchases_brighten`
  // );
  const data = [
    {
      email: 'haideraslam360@gmail.com',
      is_verified: true,
      created_at: '2024-07-22 07:37',
      full_name: 'Haider Aslam',
    },
    {
      email: 'haideraslam360@gmail.com',
      is_verified: true,
      created_at: '2024-07-22 07:37',
      full_name: 'Haider Aslam',
    },
  ];
  return data;
};
