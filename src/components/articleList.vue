<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <!-- loading이 끝나면 -->
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">
        No articles are here... yet.
      </div>
      <!-- TODO: components add -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_ARTICLES } from "../store/actions.type"

export default {
  name: "HomeGlobal",
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    author: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    favorited: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  components: {
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters(["articlesCount", "articles", "isLoading"]),
    listConfig() {
      const { type } = this
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      }
      if (this.author) {
        filters.author = this.author;
      }
      if (this.tag) {
        filters.tag = this.tag;
      }
      if (this.favorited) {
        filters.favorited = this.favorited;
      }
      return {
        type,
        filters
      };
    }
  },
  watch: {
    type() {
      this.fetchArticles();
    },
    author() {
      this.fetchArticles();
    },
    tag() {
      this.fetchArticles();
    },
    favorited() {
      this.fetchArticles();
    },
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch(FETCH_ARTICLES, this.listConfig);
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>
