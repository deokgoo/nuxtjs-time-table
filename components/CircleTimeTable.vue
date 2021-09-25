<template>
    <canvas 
        ref="canvas"
        :height="height"
        :width="width"
        >
    </canvas>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
import Color from 'color';

export interface TimeTableData {
    label: string;
    color: string;
    start: number;
    end: number;
}

export default Vue.extend({
    props: {
        height: { type: Number, default: 500 },
        width: { type: Number, default: 500 },
        timeTableData: { 
            type: Array as PropType<TimeTableData[]>,
            default() { return []; }
        }
    },
    watch: {
        height() { this.draw(); },
        width() { this.draw(); },
        timeTableData() { this.draw(); }, 
    },
    methods: {
        draw() {
            // set size
            const offset = 30;
            const radius = (
                    this.height < this.width ? 
                        this.height : this.width
                ) / 2 - offset;
            const pivot = offset + radius;

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
                    const { x, y } = time2XY(pie.start);
                    ctx.lineTo(x, y);
                    ctx.arc(
                        pivot, pivot, radius,
                        time2radian(pie.start),
                        time2radian(pie.end)
                    );
                    ctx.closePath();
                    ctx.fill();
                }
                
                { // draw pie lable
                    ctx.fillStyle = Color(pie.color).isDark() ? 'white' : 'black';
                    const mid = (pie.end - pie.start) / 2 + pie.start;
                    const { x, y } = time2XY(mid, -radius / 4);
                    ctx.fillText(pie.label, x, y);
                }

            });
            
            // draw time label
            for (let hour = 1; hour <= 24; hour++) {
                const { x, y } = time2XY(hour, offset / 2);
                ctx.strokeText(`${hour}시`, x, y);
            } 

            // coordinate convert tool
            function time2radian(time: number) {
                const angle = time * 360 / 24 - 90;
                const radian = angle / 360 * 2 * Math.PI;

                return radian;
            }

            function time2XY(time: number, offset = 0) {
                const radian = time2radian(time);

                return {
                    x: Math.cos(radian) * (radius + offset) + pivot,
                    y: Math.sin(radian) * (radius + offset) + pivot
                };
            }
        },
    }
})

</script>
