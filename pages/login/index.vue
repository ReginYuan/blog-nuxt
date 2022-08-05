<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "登录" : "注册" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">有账号?</a> -->
            <nuxt-link v-if="isLogin" to="/register">需要注册账号?</nuxt-link>
            <nuxt-link v-else to="/login">有账号?</nuxt-link>
          </p>

          <ul class="error-messages" v-if="errors && errors.length > 0">
            <li>
              {{ errors }}
            </li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="请输入您的名字"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="请输入您的邮箱"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="请输入你的密码"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "登录" : "注册" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/api/user";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  // 在路由组件渲染之前，会先执行路由中间件
  middleware: "noAuthenticated",
  name: "LoginIndex",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {}, //错误信息提示
    };
  },
  components: {},
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    // 提交用户数据
    async onSubmit() {
      try {
        let params = { ...this.user };
        const { data: result } = this.isLogin
          ? await login(params)
          : await register(params);
        console.log("result", result);
        if (result.code == 200 && result.data.existence == "old") {
          this.errors = result.msg;
        } else if (result.code == 200 && result.data.existence == "new") {
          this.$router.push("/login");
        } else if (result.code == 200 && !result.existence) {
          // 数据持久化，防止页面刷新数据丢失
          let token = result.data && result.data.token;
          Cookie.set("users", JSON.stringify({ ...result.data._doc, token }));
          this.$store.commit("setUser", { ...result.data._doc, token });
          this.$router.push("/");
        }
      } catch (err) {
        this.errors = err;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
