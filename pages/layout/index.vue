<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">飞哥的博客</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- exact精确匹配路由 -->
            <nuxt-link class="nav-link" exact to="/">主页</nuxt-link>
          </li>
          <template v-if="users">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;新增
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;设置
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/profile/1">
                <img class="user-pic" :src="users.image" />
                {{users.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">登录</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">注册</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->
    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['users'])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>