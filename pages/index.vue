<template>
  <div class="landing-page">
    <layout>
      <template #title>Garage Box</template>
      <template #child>
        <v-container class="grey lighten-4" fluid>
          <h1>Applications</h1>
          <v-row>
            <v-spacer></v-spacer>
            <template v-for="card in cards">
              <garage-card :key="card.title" :card="card"/>
            </template>
          </v-row>
        </v-container>
        <v-container>
          <h1>Todo</h1>
          <v-treeview :items="todoList"></v-treeview>
        </v-container>
      </template>
    </layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Data } from './type';
import GarageCard from '~/components/GarageCard';
import { cardsInitial, todoListInitial } from '~/pages/data';
import Layout from '~/components/LayoutTemplate/default';

export default Vue.extend({
  name: 'LandingPage',
  components: {
    Layout,
    GarageCard,
  },
  data: (): Data => ({
    title: 'Garage Box',
    cards: cardsInitial,
    todoList: todoListInitial,
  }),
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

.landing-page {
  font-family: 'Noto Sans KR', sans-serif;
}

</style>
