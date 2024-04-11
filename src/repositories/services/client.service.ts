import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import {config} from 'config';
import {ErrorResponseBaseModel, SuccessResponseBaseModel} from 'models';
import {useAuthStore} from 'stores';
import {utils} from 'utils';

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleRequest = (requestConfig: InternalAxiosRequestConfig) => {
  const {token} = useAuthStore.getState();
  requestConfig.headers[config.tokenName] = token;
  return requestConfig;
};
const handleResponse = (response: AxiosResponse) => {
  utils.logResponse(response);

  return Promise.resolve(response);
};
const handleError = (error: AxiosError<ErrorResponseBaseModel>) => {
  const {response} = error;
  const message = response?.data.message.join('. ').trim() || error.message;

  utils.logResponse(error);

  return Promise.reject(message);
};

axiosClient.interceptors.request.use(handleRequest, handleError);
axiosClient.interceptors.response.use(handleResponse, handleError);

export const service = {
  get: <Output>(url: string, config?: AxiosRequestConfig) =>
    axiosClient
      .get<SuccessResponseBaseModel<Output>>(url, config)
      .then(res => res.data),
  post: <Output, Input>(
    url: string,
    data: Input,
    config?: AxiosRequestConfig,
  ) =>
    axiosClient
      .post<
        SuccessResponseBaseModel<Output>,
        AxiosResponse<SuccessResponseBaseModel<Output>>,
        Input
      >(url, data, config)
      .then(res => res.data),
  delete: <Output = null>(url: string, config?: AxiosRequestConfig) =>
    axiosClient
      .delete<SuccessResponseBaseModel<Output>>(url, config)
      .then(res => res.data),
  put: <Output, Input>(url: string, data: Input, config?: AxiosRequestConfig) =>
    axiosClient
      .put<
        SuccessResponseBaseModel<Output>,
        AxiosResponse<SuccessResponseBaseModel<Output>>,
        Input
      >(url, data, config)
      .then(res => res.data),
};
