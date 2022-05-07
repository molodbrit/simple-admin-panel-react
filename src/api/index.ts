import axios, { Method, AxiosResponse } from 'axios';
import { TokenType, AnnounceData } from '../types/index.js';

const SERVER_URL = import.meta.env.VITE_BLOG_ADMIN_SERVER_URL;
const SERVER_PARAMS = { apikey: import.meta.env.VITE_BLOG_ADMIN_SERVER_APIKEY };

type LoginData = {
  login: string;
  password: string;
};

export function fetchAuthLogin({ login, password }: LoginData) {
  return axios.request({
    params: SERVER_PARAMS,
    url: `${SERVER_URL}/v1/auth/login`,
    method: 'post',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      email: login,
      password,
    },
  }).then((response) => Promise.resolve(response)).catch((thrown) => Promise.reject(thrown));
}

export function fetchAuthStatus(token: TokenType): Promise<object> {
  return axios.request({
    params: SERVER_PARAMS,
    url: `${SERVER_URL}/v1/auth/status`,
    method: 'get',
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((response) => Promise.resolve(response)).catch((thrown) => Promise.reject(thrown));
}

// eslint-disable-next-line function-paren-newline
async function fetchFileService(
  method: Method, endpoint: string, token: TokenType, data?: object): Promise<AxiosResponse> {
  try {
    const response = await axios.request({
      params: SERVER_PARAMS,
      url: `${SERVER_URL}/v1/${endpoint}`,
      method,
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      data,
    });
    return await Promise.resolve(response);
  } catch (thrown) {
    return await Promise.reject(thrown);
  }
}

export function getRobots(token: TokenType) {
  return fetchFileService('get', 'get/robots', token);
}

export function getRedirects(token: TokenType) {
  return fetchFileService('get', 'get/redirects', token);
}

export function getFormTags(token: TokenType) {
  return fetchFileService('get', 'get/form-tags', token);
}

export function getAnnounceB2C(token: TokenType) {
  return fetchFileService('get', 'get/announce/b2c', token);
}

export function getAnnounceB2B(token: TokenType) {
  return fetchFileService('get', 'get/announce/b2b', token);
}

export function setRobots(value: string, token: TokenType) {
  return fetchFileService('post', 'edit/robots', token, { text: value });
}

export function setRedirects(value: string, token: TokenType) {
  return fetchFileService('post', 'edit/redirects', token, { text: value });
}

export function setFormTags(value: string, token: TokenType) {
  return fetchFileService('post', 'edit/form-tags', token, { text: value });
}

export function setAnnounce(data: AnnounceData, token: TokenType) {
  console.log('11');
  return fetchFileService('post', 'edit/announce', token, data);
}
