/**
 * Nuxt.js 配置文件
 */

 module.exports = {
  router: {
    // 自定义路由表规则
    // routes: 一个数组，路由配置表
    // resolve: 解析路由组件路径
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      // 添加自己的路由规则
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', //默认子路由
              name: 'home',
              component:resolve(__dirname,'pages/home/')
            },
            {
              path: 'login', //登录路由
              name: 'login',
              component:resolve(__dirname,'pages/login/')
            },
            {
              path: 'register', //注册路由
              name: 'register',
              component:resolve(__dirname,'pages/login/')
            }
          ]
        }
      ])
    }    
  }
}
