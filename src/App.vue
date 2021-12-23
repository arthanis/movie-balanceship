<template>
  <div>
    <Header />
    <Sidebar :users="users" />

    <main class="main">
      <Home
        :users="users"
      />
    </main>
  </div>
</template>

<script>
import users from './users';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Home from '@/views/Home.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Home,
  },
  data() {
    return {
      users,
    };
  },
};
</script>

<style lang="scss">
  @import 'assets/scss/app';
</style>
