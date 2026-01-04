import axios from "axios";
import { BaseUrl, SummaryApi } from "./summayApi";

export const Axios = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token"); 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 and avoid infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const accessToken = res.data?.data?.accessToken;
    if (accessToken) {
      localStorage.setItem("access_token", accessToken); 
      return accessToken;
    }
  } catch (err) {
    console.error("Refresh token failed:", err);
  }
};
