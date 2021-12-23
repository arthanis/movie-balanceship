<template>
  <section class="sidebar">
    <ul>
      <li>
        <a href="#">Kezdőlap</a>
      </li>
      <hr>
      <li v-for="(user, index) in users" :key="index">
        <a href="#">{{user.name}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
