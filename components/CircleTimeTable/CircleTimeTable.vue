<template>
  <canvas
    ref="canvas"
    :height="height"
    :width="width"
  >
  </canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import { TimeTableData } from './type';

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
    }
  },
  mounted() {
    // set size
    this.offset = 30;
    this.radius = Math.min(this.height, this.width) / 2 - this.offset;
    this.pivot = this.offset + this.radius;

    // draw table
    this.draw();
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

      // draw background
      ctx.beginPath();
      ctx.arc(pivot, pivot, radius, 0, Math.PI * 2);
      ctx.stroke();

      // draw time table data
      this.timeTableData.forEach(pie => {
        { // draw pie
          ctx.fillStyle = pie.color;
          ctx.beginPath();
          ctx.moveTo(pivot, pivot);
          const {x, y} = this.time2XY(pie.start);
          ctx.lineTo(x, y);
          ctx.arc(
            pivot, pivot, radius,
            this.time2radian(pie.start),
            this.time2radian(pie.end)
          );
          ctx.closePath();
          ctx.fill();
        }

        // draw pie label
        {
          const mid = (pie.end - pie.start) / 2 + pie.start;
          const { x, y } = this.time2XY(mid, -radius / 4);
          ctx.strokeText(pie.label, x, y);
        }
      });

      // draw time label
      Array.from({ length: 24 }).forEach((_, h) => {
        const hour = h + 1;
        const { x, y } = this.time2XY(h + 1, offset / 2);
        ctx.strokeText(`${hour}시`, x, y);
      })
    },
  }
})
</script>
