<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { articleDetial } from "@/api/article";
import ArticleMeta from "./components/article-meta.vue";
import Markdown from "markdown-it";
export default {
  // 在路由组件渲染之前，会先执行路由中间件
  middleware: "authenticated",
  name: "ArticleIndex",
  async asyncData({ params }) {
    const { data: detial } = await articleDetial(params.slug);
    console.log("detial", detial);
    const article = detial.data[0] || [];
    const md = new Markdown();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  data() {
    return {};
  },
  components: {
    ArticleMeta,
  },
  head() {
    return {
      title: `${this.article.title} - Blog`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
