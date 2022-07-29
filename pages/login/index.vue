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

          <ul class="error-messages" v-if="errors.length > 0">
            <!-- <template v-for="(messages, filed) in errors">
              <li v-for="(message, index) in messages" :key="inde">
                {{ filed }}{{ message }}
              </li> -->
            <!-- </template> -->
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
export default {
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
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        console.log("data", data);
        if (data) {
          this.$router.push("/");
        }
      } catch (err) {
        // console.log("请求失败", err);
        console.dir(err);
        this.errors = err.message;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
