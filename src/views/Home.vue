<template>
  <div class="content-wrapper">
    <div v-for="(user, userIndex) in users" :key="`user_${userIndex}`" class="content mb-4">
      <h2 class="content__title mb-3">{{user.name}}</h2>

      <div class="row">
        <div class="col-3 col-lg-2 col-xxl-1" v-for="(item, index) in user.items" :key="index">
          <Card
            :apikey="API_KEY"
            :user="user"
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      API_KEY: '745d27b8',
      summary: [],
    };
  },
  mounted() {
    // this.data.forEach((user, index) => {
    //   const data = [];

    //   console.log(user);
    //   console.log(user.name);
    //   this.convertedUsers[index] = {
    //     name: user.name,
    //     watchedMoviesAndSeries: [],
    //   };

    //   if (user.watchedMoviesAndSeries.length) {
    //     user.watchedMoviesAndSeries.forEach((elem) => {
    //       const res = axios.get(`http://www.omdbapi.com/?i=${elem.id}&apikey=${this.API_KEY}`);

    //       data.push(res);
    //     });
    //   }

    //   Promise.all(data)
    //     .then((responses) => {
    //       console.log(responses);
    //       responses.forEach((res) => {
    //         this.convertedUsers[index].watchedMoviesAndSeries.push(res.data);
    //         console.log(res);
    //       });
    //     });
    // });
  },
};
</script>
