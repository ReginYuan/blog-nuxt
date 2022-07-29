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

          <ul class="error-messages">
            <li>该电子邮件已被占用</li>
          </ul>

          <form>
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="请输入您的名字"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="请输入您的邮箱"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="请输入你的密码"
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
export default {
  name: "loginIndex",
  data() {
    return {};
  },
  components: {},
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
