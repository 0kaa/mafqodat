<template>
  <div>
    <Statistics :statistics="statistics" />
    <div class="mt-10">
      <v-row>
        <v-col lg="6">
          <div class="report-box">
            <div class="report-box-heading">
              <h3>{{ $t('itemsReports') }}</h3>
            </div>
            <h4>
              {{ $t('itemsLengthForYear') + ' ' + new Date().getFullYear() }}
            </h4>
            <div class="reports-chart">
              <ReportCharts :reports="counts" />
            </div>
          </div>
        </v-col>
        <v-col lg="6">
          <div class="report-box">
            <div class="report-box-heading mb-0">
              <h3>{{ $t('dailyReports') }}</h3>
            </div>
            <v-data-table
              :headers="headers"
              :items="items"
              hide-default-footer
              :loading="loading"
              class="elevation-0"
              :no-data-text="$t('noData')"
            >
              <template #[`item.actions`]="{ item }">
                <v-btn class="primary--text" elevation="0" small :to="localePath(`/items/${item.id}`)">
                  {{ $t('details') }}
                </v-btn>
              </template>
            </v-data-table>
          </div>
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
      counts: reports.data.data.counts,
      items: reports.data.data.items
    }
  },
  data: () => ({
    statistics: [],
    counts: [],
    items: []
  }),
  computed: {
    headers () {
      return [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('item'), value: 'details' },
        { text: this.$t('lostTime'), value: 'time' },
        { text: this.$t('location'), value: 'location' },
        { text: '', value: 'actions', sortable: false }

      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.report-box {
  border:1px solid #EFEFEF;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgb(0,0,0,0.06);
  height: 100%;
  .report-box-heading {
    padding:16px;
    border-bottom:1px solid #E1E1E1;
    margin-bottom: 22px;
    h3{
      color:#505050;
      font-size:18px;
      font-weight:300;
    }
  }
  h4 {
    color:#505050;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    padding: 0 16px;
  }
  .reports-chart {
    padding:16px;
  }
}
</style>
