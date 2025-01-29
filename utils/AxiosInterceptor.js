import axios from 'axios';
import { config } from 'config/config';

const AxiosInterceptor = {
  initialize: () => {
    axios.defaults.baseURL = config.baseUrl;
    axios.interceptors.request.use(
      axiosConfig => {
        const authToken = localStorage.getItem('authentication_token');
        if (authToken && !axiosConfig.ignoreToken) {
          axiosConfig.headers['Authorization'] = `Bearer ${authToken}`;
        }
        // Don't override Content-Type for blob responses
        if (!axiosConfig.rawHeader && axiosConfig.responseType !== 'blob') {
          axiosConfig.headers['Content-Type'] = 'application/json';
        }

        return axiosConfig;
      },
      error => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        // For blob responses, return the entire response
        if (response.config.responseType === 'blob') {
          return response.data;
        }
        return response.data;
      },
      error => {
        if (error.response?.status === 401) {
          localStorage.clear();
        }
        return Promise.reject(error);
      }
    );
  },
};

export default AxiosInterceptor;
