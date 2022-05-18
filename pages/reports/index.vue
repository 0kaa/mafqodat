<template>
  <div>
    <Statistics :statistics="statistics" />
    <div class="mt-10">
      <v-row>
        <v-col cols="6">
          <ReportCharts :reports="counts" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Reports',
  async asyncData ({ $api }) {
    const reports = await $api.reports.get()
    return {
      statistics: reports.data.data.statistics,
      counts: reports.data.data.counts
    }
  },
  data: () => ({
    statistics: [],
    counts: []
  })

}
</script>
