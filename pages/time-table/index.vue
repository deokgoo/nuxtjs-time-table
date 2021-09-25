<template>
  <div class="time-table">
    <layout>
      <template #title>Time Table</template>
      <template #child>
        <div class="container">
          <div class="time-table__viewer">
            <div class="time-table__viewer__title">
              <h1>생활 계획표</h1>
            </div>
            <circle-time-table
                class="m-4"
                :height="450"
                :width="450"
                :time-table-data="timeTableData"
            />
          </div>
          <div class="time-table__box">
            <div class="time-table__viewer__title">
              <h1>계획표 관리</h1>
            </div>
            <v-container class="grey lighten-5">
              <v-row no-gutters>
                <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="12"
                    sm="4"
                >
                  <v-card
                      class="pa-2"
                      outlined
                      tile
                  >
                    One of three columns
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </template>
    </layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '~/components/LayoutTemplate/default.vue';
import CircleTimeTable from '~/components/CircleTimeTable';
import { timeTableInitialData } from '~/components/CircleTimeTable/data';

export default Vue.extend({
  name: 'TimeTable',
  components: {
    Layout,
    CircleTimeTable,
  },
  data() {
    return {
      timeTableData: timeTableInitialData
    }
  },
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

.container {
  width: 100%;
  display: flex;
  font-family: 'Noto Sans KR', sans-serif;

  .time-table__viewer {
    flex: 60% 1 1;
    display: flex;
    flex-direction: column;
    .time-table__viewer__title > h1 {text-align: center;}
  }
  .time-table__viewer__title {
    margin-bottom: 1rem;
    font-size: 1rem;

  }

  .time-table__box {
    flex: 40% 1 1;
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 780px) {
  .container {
    flex-direction: column;
  }
}
</style>
