/**
 * 基于axios封装请求模块
 */
import axios from "axios";

const request = axios.create({
  URL: "https://conduit.productionready.io", //接口
  timeout: 5000
});

// 请求拦截其

// 相应拦截器

export default request