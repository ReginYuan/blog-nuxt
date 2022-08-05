/**
 * axios二次封装
 */

import axios from "axios";
import cookie from "js-cookie";
// import { ElMessage } from 'element-plus'

const env = process.env.NODE_ENV;

// 自定义报错
const TOKEN_INVALID = "Token认证失败，请重新登录";
const NETWORK_ERROR = "网络请求异常，请稍后重试";
// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: "http://localhost:3000"
});

// 请求拦截
service.interceptors.request.use((req) => {
  // req.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
  const headers = req.headers;
  const { token = "" } = {};
  if (!headers.Authorization) headers.Authorization = "Bearer " + token;
  return req;
});

// 响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  console.log("res.data", res.data);
  if (code === 200) {
    let result = { code, data, msg };
    return result;
  } else if (code === 500001) {
    // 提示异常
    // ElMessage.error(TOKEN_INVALID)
    // 跳转到登录页面
    // setTimeout(() => {
    //   router.push('/login')
    // }, 1500)
    // 向控制台抛出异常
    return Promise.reject(TOKEN_INVALID);
  } else {
    // 提示异常
    // ElMessage.error(msg || NETWORK_ERROR)
    // 向控制台抛出异常
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    // 转换类型
    options.params = options.data;
  }
  // 设置isMock,保持config.mock不被覆盖
  // let isMock = config.mock;

  // 如果mock接口不是undefined
  // if (typeof options.mock != 'undefined') {
  //设置的mook覆盖全局的moock
  // isMock = options.mock
  // }

  // 如果是生产环境
  if (env === "production") {
    // 生产环境 线上地址
    service.defaults.baseURL = "http://localhost:3333";
  } else {
    // 如果开发环境
    service.defaults.baseURL = "http://localhost:3333";
  }
  return service(options);
}

// 封装请求方式
["get", "post", "put", "delete", "patch"].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    });
  };
});

export default request;
