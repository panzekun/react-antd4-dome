import axios from 'axios';
import { message } from 'antd';
const $axios = axios.create({
  // baseURL: process.env.xxxx,
  timeout: 6000,
  retry: 4,
  retryDelay: 1000
});

//请求拦截
$axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 通过reudx的store拿到拿到全局状态树的token ，添加到请求报文，后台会根据该报文返回status
    // 此处应根据具体业务写token
    // const token = store.getState().user.token || localStorage.getItem('token');
    const token = 'FA2019';
    config.headers['X-Token'] = token;
    console.log(config)
    return config;
  },
  error => {
    // 对请求错误做些什么
    message.error(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
$axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    console.log(error.response) // for debug
    //  对请求失败的HTTP状态码做处理
    message.error('请求失败');
    return Promise.reject(error)
  }
);

// 输出方法
export default function request(url, data = {}, method = 'POST') {
  return new Promise((resolve, reject) => {

    const options = method === 'POST' ? {
      url,
      method,
      data
    } : {
        url,
        method,
        params: data
      }
    $axios(options)
      .then(res => {
        const {data}= {...res}
        console.log('返回数据', res)
        if (data.code !== 0) {
          message.error(data.msg);
        } else {
          resolve(data.data)
        }

      })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}
