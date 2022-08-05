<template>
 <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">博客</h1></h1>
      <p>一个分享你知识的地方.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="users">
              <nuxt-link
               class="nav-link"
               :class="{
                 active: tab === 'your_feed'
               }"
               exact
              :to="{
              name:'home',
              query:{
               tab:'your_feed'
              }
              }">你的关注</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
               class="nav-link"
               exact
               :class="{
                 active: tab === 'global_feed'
               }"
              :to="{
              name:'home',
              query:{
               tab:'global_feed'
              }
              }">所有文章</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
             <nuxt-link
               class="nav-link"
               exact
               :class="{
                 active: tab === 'tag'
               }"
              :to="{
              name:'home',
              query:{
               tab: 'tag',
               tag: tag
              }
              }">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="(item,index) in list" :key="index">
          <div class="article-meta">
            <nuxt-link :to="{
              name:'profile',
              params:{
                username:item.author.username
              }
            }">
               <img :src="item.author.image"/>
              </nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{
                name:'profile',
                params:{
                username:item.author.username
                }
              }">
                {{item.author.username}}
              </nuxt-link>
              <span class="date">{{item.createdAt | date('YYYY,MM DD')}}</span>
            </div>
            <button @click="onFavorited(item)"
            :disabled="item.favoriteDisavled"
              class="btn btn-outline-primary btn-sm pull-xs-right"
             :class="{
              active:item.favorited
              }
            ">
              <i class="ion-heart"></i> {{item.favoritesCount}}
            </button>
          </div>
          <nuxt-link 
            :to="{
              name:'article',
              params:{
              slug:item.slug
              }
            }" 
            class="preview-link">
            <h1>{{item.title}}</h1>
            <p>{{item.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
            <div class="info">
              <a href="" class="author">Albert Pai</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 32
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>
        <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link 
            :to="{
              name: 'home',
              query: {
                tab:'tag',
                tag: item.tag,
              }
            }" 
            class="tag-pill tag-default" 
            v-for="(item,index) in tagsList"
             :key="index">
             {{item.tag}}
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>

</template>

<script>
import { getArticleList, getFeedArticleList, favorite } from "@/api/article";
import { getTagsList } from "@/api/tags";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const { tag } = query;
    const pageSize = 10;
    const email = store.state.users ? store.state.users.email : "";

    let params = {
      pageNum: page,
      pageSize: pageSize,
      tag: tag || "",
      email: email,
    };
    // 获取文章列表
    const { data: articleData } =
      store.state.users && query.tab === "your_feed"
        ? await getFeedArticleList(params)
        : await getArticleList(params);
    // 解构文章列表信息
    const { data: articleList } = articleData;
    console.log("articleList", articleList);
    articleList.list.forEach((item) => (item.favoriteDisavled = false));
    // 获取标签接口
    const { data: tagsdata } = await getTagsList();
    // 解构标签信息
    const { data: tagsList } = tagsdata;
    return {
      list: articleList.list || [],
      total: articleList.page.total,
      page,
      pageSize,
      tagsList,
      tag,
      tab: query.tab || "global_feed",
    };
  },
  components: {},
  props: {},
  data() {
    return {};
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["users"]),
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFavorited(item) {
      item.favoriteDisavled = true;
      if (item.favorited) {
        await favorite(item.slug);
        item.favorited = false;
        item.favoritesCount += -1;
      } else {
        await favorite(item.slug);
        item.favorited = true
        item.favoritesCount += 1;
      }
      item.favoriteDisavled = false;
    },
  },
};
</script>

<style scoped>
</style>