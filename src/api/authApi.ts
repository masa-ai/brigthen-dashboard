import axios from 'axios';

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_CORE + '/users/personal/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUserAPI = async (formdata: FormData) => {
  const response = await authApi.postForm('/jwt/login', formdata);
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
