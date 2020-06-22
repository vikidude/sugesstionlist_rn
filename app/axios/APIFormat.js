import axios from 'axios';
import {BASE_PATH} from './APIConstants';

export const _POST = (url, data, config) => {
  console.log('POST REQUEST BASE_PATH ' + BASE_PATH + url + data, config);
   return axios.post(BASE_PATH + url,data, {headers: config});
};

export const _GET = (url, data, config) => {
  console.log('GET REQUEST BASE_PATH + url + data ' + BASE_PATH + url + data, config);
  return axios.get(BASE_PATH + url + data);
};

export const _DELETE = (url, data, config) => {
  console.log('DELETE REQUEST BASE_PATH + url + data ' + BASE_PATH + url + data);
  return axios.delete(BASE_PATH + url + data, {headers: config});
};

export const _PUT = (url, id, data, config) => {
  console.log("config",config);
  console.log('PUT_REQUEST BASE PATH ' + BASE_PATH + url + id + JSON.stringify(data),config);
  return axios.put(BASE_PATH + url + id,data, {headers: config});
};