import { request } from "@/plugins/request";

/**
 * 获取公共文章列表
 * @param {*} params
 * @returns
 */
export const getArticleList = (params) => {
  return request({
    method: "get",
    url: "/api/article/all",
    params
  });
};

/**
 * 获取公共文章列表
 * @param {*} params
 * @returns
 */
export const getFeedArticleList = (params) => {
  return request({
    method: "get",
    url: "/api/article/feed",
    params
  });
};

/**
 * 文章添加点赞或取消点赞
 * @param {*} params
 * @returns
 */
export const favorite = (slug) => {
  return request({
    method: "post",
    url: "/api/article/favorite",
    data: { slug }
  });
};

/**
 * 文章添加点赞或取消点赞
 * @param {*} params
 * @returnsDetial
 */
export const articleDetial = (slug) => {
  return request({
    method: "get",
    url:`/api/article/detail/${slug}`,
  });
};
