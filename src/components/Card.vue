<template>
  <div class="mt-2">
    <h4>{{ apikey }}</h4>
    <div>{{item}}</div>
    <div>{{user}}</div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'Card',
  props: {
    apikey: {
      type: String,
    },
    user: {
      type: Object,
      default: () => {},
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
    // d
    };
  },
  mounted() {
    //
  },
};
</script>
