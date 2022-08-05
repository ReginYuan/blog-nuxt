/**
 * 基于 axios 封装的请求模块
 */

import axios from "axios";

// 自定义报错
const TOKEN_INVALID = "Token认证失败，请重新登录";
const NETWORK_ERROR = "网络请求异常，请稍后重试";
// 创建请求对象
export const request = axios.create({
  baseURL: "http://localhost:3333"
});

// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截
  request.interceptors.request.use((req) => {
    // req.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    let token = null;
    const headers = req.headers;
    const { users } = store.state;

    if (users && users.token) {
      token = users.token || "";
    }

    if (!headers.Authorization) headers.Authorization = "Bearer " + token;
    // 返回 config 请求配置对象
    return req;
  });
};
