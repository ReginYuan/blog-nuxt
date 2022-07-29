import request from "@/utils/request";

/**
 * 登录功能
 * @param {*} params
 * @returns
 */
export const login = (data) => {
  return request({
    method: "POST",
    url: "/api/users/login",
    data
  });
};
/**
 * 注册功能
 * @param {*} params
 * @returns
 */
export const register = (data) => {
  return request({
    method: "POST",
    url: "/api/users",
    data
  });
};
