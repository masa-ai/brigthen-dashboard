import axios from 'axios';
import { deleteCookie, getCookie, getCookies } from 'cookies-next';

const dashboardApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_CORE + '/sentra_dashboard',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  withCredentials: true,
});

dashboardApi.interceptors.request.use(
  (config) => {
    if (getCookie('token')) {
      config.headers['Authorization'] = 'Bearer ' + getCookie('token');
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

dashboardApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      Object.keys(getCookies()).forEach(function (cookieName) {
        deleteCookie(cookieName);
      });
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export const getUsersProfile = async (token, limit = 10, offset = 0) => {
  const response = await dashboardApi.get(
    `/brighten/all_purchases?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateUserStatus = async (email, is_verified) => {
  const response = await dashboardApi.post(`/set_user_email_verified_status`, {
    email: email,
    is_verified: is_verified,
  });
  return response.data;
};
