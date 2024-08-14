import axios from 'axios';

// const dashboardApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_CORE,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const getUsersProfile = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_CORE}/sentra_dashboard/all_purchases_brighten`
  );
  return response.data;
};

export const updateUserStatus = async (email, is_verified) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT_CORE}/sentra_dashboard/set_user_email_verified_status`,
    {
      email: email,
      is_verified: is_verified,
    }
  );
  return response.data;
};
