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
          <ArticleEvaluate :evaluate="evaluate" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { articleDetial } from "@/api/article";
import { getEvaluateList } from "@/api/evaluate";
import ArticleMeta from "./components/article-meta.vue";
import ArticleEvaluate from "./components/article-evaluate.vue";
import Markdown from "markdown-it";
export default {
  // 在路由组件渲染之前，会先执行路由中间件
  middleware: "authenticated",
  name: "ArticleIndex",
  async asyncData({ params }) {
    const { data: detial } = await articleDetial(params.slug);
    const { data: evaluateData } = await getEvaluateList(params.slug);

    const article = detial.data[0] || [];
    const md = new Markdown();
    article.body = md.render(article.body);

    const evaluate = evaluateData.data || [];
    console.log("evaluate", evaluate);

    return {
      article,
      evaluate,
    };
  },
  data() {
    return {};
  },
  components: {
    ArticleMeta,
    ArticleEvaluate,
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
