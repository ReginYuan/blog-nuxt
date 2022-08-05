import { request } from "@/plugins/request";

/**
 * 获取标签列表
 * @param {*} params
 * @returns
 */
export const getTagsList = () => {
  return request({
    method: "get",
    url: "/api/tags/list"
  });
};
