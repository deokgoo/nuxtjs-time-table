<template>
  <div class="time-table">
    <layout>
      <template #title>Time Table</template>
      <template #child>
        <div class="container">
          <div class="time-table__viewer">
            <div class="time-table__viewer__title">
              생활 계획표
            </div>
          </div>
          <div class="time-table__box">
            something
          </div>
        </div>
      </template>
    </layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from '~/components/LayoutTemplate/default';

export default Vue.extend({
  components: {
    Layout
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
    justify-content: center;
    .time-table__viewer__title {
      font-size: 1rem;
    }
  }
  .time-table__box {
    flex: 40% 1 1;
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 780px) {
  .container {
    flex-direction: column;
  }
}
</style>
