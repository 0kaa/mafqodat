<template>
  <div class="chart-area">
    <line-chart
      ref="bigChart"
      :chart-data="bigLineChart.chartData"
      :gradient-colors="bigLineChart.gradientColors"
      :gradient-stops="bigLineChart.gradientStops"
      :extra-options="bigLineChart.extraOptions"
    />
  </div>
</template>
<script>
import LineChart from '@/components/Charts/LineChart'
import * as chartConfigs from '@/components/Charts/config'
import config from '@/config'

const bigChartData = [[180, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 140]]
const bigChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4
}

export default {
  name: 'ReportCharts',
  components: {
    LineChart
  },
  props: {
    reports: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      }

    }
  },
  mounted () {
    this.initBigChart(0)
  },
  methods: {
    initBigChart (index) {
      const chartData = {
        datasets: [{ ...bigChartDatasetOptions, data: bigChartData[index] }],
        labels: bigChartLabels
      }
      this.$refs.bigChart.updateGradients(chartData)
      this.bigLineChart.chartData = chartData
      this.bigLineChart.activeIndex = index
      for (let i = 0; i < 12; i++) {
        // this.bigLineChart.chartData.datasets[0].data[i] = this.reports[index].data[i]
        if (this.reports[i + 1] && this.reports[i + 1].month === i + 1) {
          this.bigLineChart.chartData.datasets[0].data[i] = this.reports[i + 1].data
        } else {
          this.bigLineChart.chartData.datasets[0].data[i] = 0
        }
      }
    }
  }
}
</script>
