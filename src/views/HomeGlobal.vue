<template>
  <div class="home-global">
    <ArticlesList type="all" />
  </div>
</template>

<script>
import ArticlesList from "@/components/articleList"

export default {
  name: "HomeGlobal",
  components: {
    ArticlesList
  },
};
</script>
