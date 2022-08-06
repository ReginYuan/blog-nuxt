/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    // 匹配到的路由高亮
    linkActiveClass: "active",
    // 自定义路由表规则
    // routes: 一个数组，路由配置表
    // resolve: 解析路由组件路径
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0);
      // 添加自己的路由规则
      routes.push(
        ...[
          {
            path: "/",
            component: resolve(__dirname, "pages/layout/"),
            children: [
              {
                path: "", //默认子路由
                name: "home",
                component: resolve(__dirname, "pages/home/")
              },
              {
                path: "login", //登录路由
                name: "login",
                component: resolve(__dirname, "pages/login/")
              },
              {
                path: "register", //注册路由
                name: "register",
                component: resolve(__dirname, "pages/login/")
              },
              {
                path: "/profile/:username", //用户详情路由
                name: "profile",
                component: resolve(__dirname, "pages/profile/")
              },
              {
                path: "/settings", //设置路由
                name: "settings",
                component: resolve(__dirname, "pages/settings/")
              },
              {
                path: "/editor", //新增或者编辑文章路由
                name: "editor",
                component: resolve(__dirname, "pages/editor/")
              },
              {
                path: "/article/:slug", //文章详情路由
                name: "article",
                component: resolve(__dirname, "pages/article/")
              }
            ]
          }
        ]
      );
    }
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    //是否开启跨域
    proxy: true
  },
  // 注册插件
  plugins: ["~/plugins/request.js", "~/plugins/dayjs.js"],
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  proxy: {
    "/api": {
      target: "http://localhost:3000"
    }
  }
};
