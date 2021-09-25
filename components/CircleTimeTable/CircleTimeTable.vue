<template>
  <canvas
    ref="canvas"
    :height="height * dpr"
    :width="width * dpr"
    :style="{ height: `${height}px`, width: `${width}px` }">
  </canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import Color from 'color';
import { TimeTableData } from '~/components/CircleTimeTable/type';

export default Vue.extend({
  props: {
    height: {type: Number, default: 500},
    width: {type: Number, default: 500},
    timeTableData: {
      type: Array as Vue.PropType<TimeTableData[]>,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      offset: 0,
      radius: 0,
      pivot: 0,
      dpr: 0
    }
  },
  mounted() {
    // set size
    this.offset = 34;
    this.radius = Math.min(this.height, this.width) / 2 - this.offset;
    this.pivot = this.offset + this.radius;
    this.dpr = window.devicePixelRatio;

    // draw table
    this.$nextTick(() => this.draw());
  },
  methods: {
    time2radian(time: number) {
      const angle = time * 360 / 24 - 90;

      return angle / 360 * 2 * Math.PI;
    },

    time2XY(time: number, offset = 0) {
      const { pivot, radius } = this;
      const radian = this.time2radian(time);

      return {
        x: Math.cos(radian) * (radius + offset) + pivot,
        y: Math.sin(radian) * (radius + offset) + pivot
      };
    },

    draw() {
      const { offset, radius, pivot } = this;
      // get canvas api
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d')!;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 10pt Noto Sans KR, sans-serif';
      ctx.scale(this.dpr, this.dpr);

      // draw background
      ctx.beginPath();
      ctx.arc(pivot, pivot, radius, 0, Math.PI * 2);
      ctx.stroke();

      // draw pies
      this.timeTableData.forEach(pie => {
        const { x, y } = this.time2XY(pie.start);
        ctx.fillStyle = pie.color;
        ctx.beginPath();
        ctx.moveTo(pivot, pivot);
        ctx.lineTo(x, y);
        ctx.arc(
          pivot, pivot, radius,
          this.time2radian(pie.start),
          this.time2radian(pie.end)
        );
        ctx.closePath();
        ctx.fill();
      });

      // draw pies label
      this.timeTableData.forEach(pie => {
        const mid = (pie.end - pie.start) / 2 + pie.start;
        const { x, y } = this.time2XY(mid, -radius / 4);
        ctx.fillStyle = Color(pie.color).isDark() ? 'white' : 'black';
        ctx.fillText(pie.label, x, y);  
      })

      // draw time label
      ctx.fillStyle = 'black';
      Array.from({ length: 24 }).forEach((_, h) => {
        const hour = h + 1;
        const { x, y } = this.time2XY(h + 1, offset / 2);
        ctx.strokeText(`${hour}시`, x, y);
      })
    },
  }
})
</script>
