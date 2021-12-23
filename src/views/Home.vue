<template>
  <div class="content-wrapper" v-if="summary.length">
    <div v-for="(user, userIndex) in users" :key="`user_${userIndex}`" class="content mb-4">
      <h2 class="content__title mb-3">
        {{user.name}} - {{ convertedRuntime(summary[userIndex].runtime) }}
      </h2>

      <div class="row">
        <div class="col-3 col-lg-2 col-xxl-1" v-for="(item, index) in user.items" :key="index">
          <Card
            :apikey="API_KEY"
            :user="user"
            :userIndex="userIndex"
            :item="item"
            @runtime="handleSummary($event)"
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
    this.summary = this.users.map((user) => ({ userId: user.id, runtime: 0 }));
  },
  methods: {
    handleSummary(event) {
      const { userIndex, runtime } = event;

      this.summary[userIndex].runtime += runtime;
      console.log(userIndex, runtime);
    },
    convertedRuntime(runtime) {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;

      return `${hours} óra ${minutes} perc`;
    },
  },
};
</script>
