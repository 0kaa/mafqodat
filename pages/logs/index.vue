<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('logs')" />
    <div class="logs-container">
      <Log v-for="(log,i) in logs" :key="i" :log="log" />
    </div>
    <div class="text-center">
      <v-btn
        v-if="meta.current_page < meta.last_page"
        color="primary"
        class="my-4"
        elevation="0"
        :loading="loading"
        @click="getMoreLogs(page)"
      >
        {{ $t('loadMore') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  async asyncData ({ $api }) {
    const logs = await $api.auth.logs(1)
    return {
      logs: logs.data.data.data,
      meta: logs.data.data.meta,
      links: logs.data.data.links
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async getMoreLogs () {
      if (this.meta.current_page < this.meta.last_page) {
        this.loading = true
        const logs = await this.$api.auth.logs(this.meta.current_page + 1)
        this.logs = this.logs = [...this.logs, ...logs.data.data.data]
        this.meta = logs.data.data.meta
        this.links = logs.data.data.links
        this.loading = false
      }
    }
  }
}
</script>
