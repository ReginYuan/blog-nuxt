<template>
  <div class="">
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="(item, index) in evaluate" :key="index">
      <div class="card-block">
        <p class="card-text">
          {{ item.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: item.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="item.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: item.author.username,
            },
          }"
          class="comment-author"
          >{{ item.author.username }}</nuxt-link>
        <span class="date-posted">{{ item.createdAt | date("YYYY,MM DD") }}</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getEvaluateList } from "@/api/evaluate";
export default {
  name: "ArticleEvaluate",
  props: {
    evaluate: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
</style>
