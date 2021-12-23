<template>
  <div class="card mt-2">
    <img :src="cover" :alt="title" class="img-fluid card__image" />

    <p class="card__title mt-2 mb-0"><strong>{{ title }}</strong></p>

    <p class="mb-1">({{ year }})</p>

    <p class="text-muted mb-0">{{ convertedRuntime }}</p>

    <p class="card__rating">
      <i class="bi bi-star-fill text-warning"></i>
      <span class="ms-2">{{ imdbRating }}</span>
    </p>

    <div class="d-none">
      <div class="mt-5">{{ item }}</div>
      <div>{{user}}</div>
    </div>
  </div>
</template>

<script>
/* eslint no-plusplus: 0 */
import axios from 'axios';

export default {
  name: 'Card',
  props: {
    apikey: {
      type: String,
    },
    userIndex: {
      type: Number,
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
  computed: {
    convertedRuntime() {
      const hours = Math.floor(this.runtime / 60);
      const minutes = this.runtime % 60;

      return `${hours} óra ${minutes} perc`;
    },
  },
  data() {
    return {
      title: '',
      cover: '',
      year: '',
      type: '',
      runtime: 0,
      imdbRating: 0,
    };
  },
  async mounted() {
    const baseURL = `http://www.omdbapi.com/?i=${this.item.id}&apikey=${this.apikey}`;

    try {
      const res = await axios.get(baseURL);

      this.title = res.data.Title;
      this.cover = res.data.Poster;
      this.type = res.data.Type;
      this.year = res.data.Year;
      this.imdbRating = res.data.imdbRating;

      if (this.type === 'movie') {
        this.runtime = Number(res.data.Runtime.split(' ')[0]);
        this.$emit('runtime', { userIndex: this.userIndex, runtime: this.runtime });
      }

      if (this.type === 'series') {
        const seasons = Number(res.data.totalSeasons);

        for (let season = 1; season <= seasons; season++) {
          axios.get(`${baseURL}&season=${season}`)
            .then((seasonRes) => {
              const episodes = seasonRes.data.Episodes;

              for (let episode = 1; episode <= episodes.length; episode++) {
                axios.get(`${baseURL}&season=${season}&episode=${episode}`)
                  .then((episodeRes) => {
                    const runtime = episodeRes.data.Runtime === 'N/A'
                      ? 0
                      : Number(episodeRes.data.Runtime.split(' ')[0]);

                    this.runtime += runtime;
                    this.$emit('runtime', { userIndex: this.userIndex, runtime });
                  })
                  .catch((episodeErr) => console.error(episodeErr));
              }
            })
            .catch((seasonErr) => console.error(seasonErr));
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
