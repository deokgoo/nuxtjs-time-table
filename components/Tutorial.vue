<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-4xl leading-7 font-semibold text-center m-4">
          영규 생활 계획표
        </h2>
        <circle-time-table
          class="m-4"
          :height="450" 
          :width="450" 
          :time-table-data="timeTableData"
          />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
// eslint-disable-next-line import/named
import Vue from 'vue'
import CircleTimeTable, { TimeTableData } from '~/components/CircleTimeTable.vue'

export default Vue.extend({
  components: { CircleTimeTable },
  data() {
    return {
        timeTableData: [] as TimeTableData[]
    }
  },
  mounted() {
    this.timeTableData = [
      {
        label: '낸네 🌙',
        color: 'gray',
        start: 0.0,
        end: 7.0
      },
      {
        label: '굿모닝 ☀️',
        color: 'skyblue',
        start: 7.0,
        end: 8.0
      },
      {
        label: '산책 🏃‍♂️',
        color: 'green',
        start: 8.0,
        end: 9.0
      },
      {
        label: '공부 📙',
        color: 'yellow',
        start: 9.0,
        end: 13.0
      },
      {
        label: '점심 🍽️',
        color: 'orange',
        start: 13.0,
        end: 14.0
      },
      {
        label: '공부 📚',
        color: 'red',
        start: 14.0,
        end: 19.0
      },
      {
        label: '저녁 🥩',
        color: 'brown',
        start: 19.0,
        end: 20.0
      },
      {
        label: '공부 📜',
        color: 'purple',
        start: 20.0,
        end: 22.5
      },
      {
        label: '밤 🌟',
        color: 'blue',
        start: 22.5,
        end: 24.0
      }
    ];
  }
})
</script>
