import { request } from "@/plugins/request";

/**
 * 登录功能
 * @param {*} params
 * @returns
 */
export const login = (params) => {
  return request({
    method: "post",
    url: "/api/users/login",
    data: params
  });
};
/**
 * 注册功能
 * @param {*} params
 * @returns
 */
export const register = (params) => {
  return request({
    method: "post",
    url: "/api/users/sign",
    data: params
  });
};

/**
 *
 * @param params 登出
 * @returns
 */
export const logout = (params) => {
  return request({
    url: "/api/users/logout",
    method: "post",
    params
  });
};
