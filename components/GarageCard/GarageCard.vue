<template>
  <v-col class="garage-card" cols="12" sm="6" md="4" @click="movePageHandler">
    <v-card>
      <v-img :src="card.imgUri" height="300px"></v-img>
      <v-card-title v-text="card.title"/>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import { Card } from './type';

export default Vue.extend({
  name: 'GarageCard',
  props: {
    card: {
      type: Object as Vue.PropType<Card>,
      default: () => ({
        title: 'tmp',
        imgUri: '',
        uri: '',
      }),
    },
  },
  methods: {
    movePageHandler() {
      this.$router.push(this.card.uri)
    }
  },
});
</script>

<style lang="scss">
.garage-card {
  padding: 0;
  margin: 6px;
  cursor: pointer;
  &:hover {
    -webkit-box-shadow: 4px 3px 8px 0 rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 3px 8px 0 rgba(0,0,0,0.75);
    box-shadow: 4px 3px 8px 0 rgba(0,0,0,0.75);
  }
}
</style>
