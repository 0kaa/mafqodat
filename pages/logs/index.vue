<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('logs')" />
    <div class="">
      <div class="mb-4 d-flex align-center">
        <DownloadExcel
          :data="json_data"
          :fields="json_fields"
          worksheet="logs worksheet"
          :name="`logs_${$auth.user.name}.xls`"
        >
          <v-btn elevation="0" class="primary--text me-2">
            {{ $t('excel') }}
          </v-btn>
        </DownloadExcel>
        <!-- <v-btn elevation="0">
          {{ $t('pdf') }}
        </v-btn> -->
      </div>
      <v-data-table
        :headers="headers"
        :items="logs"
        :page.sync="page"
        :items-per-page="meta.per_page"
        hide-default-footer
        :loading="loading"
        class="elevation-2"
        :no-data-text="$t('noData')"
        @click:row="onClickRow"
      />
    </div>

    <div class="text-center pt-8">
      <v-pagination
        v-if="meta.last_page > 1"
        v-model="page"
        :length="meta.last_page"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  async asyncData ({ $api }) {
    const logs = await $api.auth.logs(1)
    const allLogs = await $api.auth.allLogs()
    return {
      logs: logs.data.data.data,
      allLogs: allLogs.data.data,
      meta: logs.data.data.meta,
      links: logs.data.data.links
    }
  },
  data () {
    return {
      loading: false,
      page: 1,
      allLogs: [],
      json_fields: {},
      json_data: [],
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ]
    }
  },
  computed: {
    headers () {
      return [
        { text: this.$t('itemId'), value: 'item_id' },
        { text: this.$t('event'), value: 'message' },
        { text: this.$t('time'), value: 'time' },
        { text: this.$t('theDate'), value: 'date' }
      ]
    }
  },
  watch: {
    page: {
      handler (page) {
        this.getMoreLogs(page)
      },
      deep: true
    }
  },
  mounted () {
    this.json_fields = {
      [this.$t('itemId')]: 'item_id',
      [this.$t('event')]: 'message',
      [this.$t('time')]: 'time',
      [this.$t('date')]: 'date'
    }
    this.json_data = this.allLogs.map((log) => {
      return {
        item_id: log.item_id,
        message: log.message,
        time: log.time,
        date: log.date
      }
    })
  },
  methods: {
    onClickRow (v) {
      this.$router.push(`/items/show/${v.item_id}`)
    },
    async getMoreLogs (page) {
      this.loading = true
      const logs = await this.$api.auth.logs(page)
      this.logs = logs.data.data.data
      this.meta = logs.data.data.meta
      this.links = logs.data.data.links
      this.loading = false
    }
  }
}
</script>
