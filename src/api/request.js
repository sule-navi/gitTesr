/*
 * @Author: Sule
 * @Date: 2021-04-08 15:47:36
 * @LastEditors: Sule
 * @LastEditTime: 2021-04-08 16:02:17
 * @Description: 
 */
import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: urlConfig.service,
  timeout: 30000, // 请求超时时间
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
});

// request拦截器
service.interceptors.request.use((config) => {
  return config;
}, (error) => {
  // Do something with request error
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.errcode !== 0) {
      return Promise.reject(res.errmsg);
    }
    return response.data;
  },
  error => Promise.reject(error)
);

export function post(url, parameter, headers = null, isFlag = true) {
  const searchParams = new URLSearchParams();
  searchParams.append('parameter', JSON.stringify(parameter));
  searchParams.append('isFlag', isFlag);
  return new Promise((resolve, reject) => {
    service.post(url, searchParams, headers).then((response) => {
      resolve(response.data);
    }, (err) => {
      if (err.message) {
        reject(err.message);
      } else {
        reject(err);
      }
    })
      .catch((error) => {
        if (error.message) {
          reject(error.message);
        } else {
          reject(error);
        }
      });
  });
}

export function get(url, params, isFlag = true) {
  let timeoutValue = 30000;
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: {
        isFlag,
        parameter: JSON.stringify(params)
      },
      timeout: timeoutValue
    }).then((response) => {
      resolve(response.data);
    }, (err) => {
      if (err.message) {
        reject(err.message);
      } else {
        reject(err);
      }
    })
      .catch((error) => {
        if (error.message) {
          reject(error.message);
        } else {
          reject(error);
        }
      });
  });
}
