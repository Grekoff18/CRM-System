<template>
  <ul class="sidenav app-sidenav" :class="value ? 'open' : ''">
    <router-link
      v-for="link in links"
      v-bind:key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      exact
    >
      <a href="#" class="waves-effect waves-orange pointer">
        {{ link.title }}
      </a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      links: [
        { title: "Bill", url: "/" },
        { title: "History", url: "/history" },
        { title: "Planning", url: "/planning" },
        { title: "New entry", url: "/record" },
        { title: "Categories", url: "/categories" },
      ],
    };
  },
};
</script>