<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('logs')" />
    <div class="logs-container">
      <Log v-for="(log,i) in logs" :key="i" :log="log" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  async asyncData ({ $api }) {
    const logs = await $api.auth.logs('/logs')
    return {
      logs: logs.data.data.data,
      meta: logs.data.data.meta,
      links: logs.data.data.links
    }
  },
  data () {
    return {
      logs: []
    }
  }
}
</script>

<style>
.logs-container {
  border: 1px solid #CECECE;
  border-radius: 8px;
}
</style>
