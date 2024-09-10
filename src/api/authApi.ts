import axios from 'axios';

const authApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_ENDPOINT_CORE + '/users/organization/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUserAPI = async (email: string, password: string) => {
  try {
    const response = await authApi.post(
      '/jwt/login',
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error('Error response:', error.response);
      return error.response;
    } else {
      // console.error('Unexpected error:', error);
      return error;
    }
  }
};

export const requestVerifyTokenAPI = async (email: string) => {
  const response = await authApi.post('/request-verify-token', { email });
  return response.data;
};

export const registerUserAPI = async (bodyReq: {
  user_name: string;
  email: string;
  password: string;
  profile_detail: {
    first_name: string;
    last_name: string;
    phone_number: string;
  };
  organization_type: string;
}) => {
  const response = await authApi.post('/register', bodyReq);
  return response.data;
};

export const forgotPasswordAPI = (bodyReq: { email: string }) => {
  const response = authApi.post('/forgot-password', bodyReq);
  return response;
};
