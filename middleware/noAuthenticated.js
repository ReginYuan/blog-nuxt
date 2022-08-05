/**
 * 验证登录路由中间件
 */

 export default function ({ store, redirect }) {
  if (store.state.users) {
    return redirect("/");
  }
}
