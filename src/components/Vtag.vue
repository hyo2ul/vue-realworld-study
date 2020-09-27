<template>
  <router-link :to="homeRoute" :class="className">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: "tag",
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      tpye: String,
      default: "tag-pill tag-default"
    }
  },
  computed: {
    homeRoute: () => ({ name: "home-tag", params: { tag: name } })
  }
};
</script>
