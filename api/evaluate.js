import { request } from "@/plugins/request";

/**
 * 获取对应文章评论
 */
 export const getEvaluateList = (slug) => {
  return request({
    method: "get",
    url: `/api/evaluate/${slug}/list`
  });
};