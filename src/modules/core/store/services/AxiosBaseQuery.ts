import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import BaseService from './BaseService';

const AxiosBaseQuery = async (request: {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}) => {
  try {
    const response = BaseService(request);
    return response;
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      }
    };
  }
};

export default AxiosBaseQuery;
