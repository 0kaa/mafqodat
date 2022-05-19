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

const bigChartData = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]]
const bigChartLabelsEn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const bigChartLabelAr = [
  'يناير',
  'فبراير',
  'مارس',
  'إبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
]

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
          labels: bigChartLabelsEn
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
        datasets: [{ ...bigChartDatasetOptions, data: this.reports }],
        labels: this.$vuetify.rtl ? bigChartLabelAr : bigChartLabelsEn
      }
      this.$refs.bigChart.updateGradients(chartData)
      this.bigLineChart.chartData = chartData
      this.bigLineChart.activeIndex = index
    }
  }
}
</script>
