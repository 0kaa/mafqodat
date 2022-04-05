<template>
  <v-row justify="center" align="center">
    <button @click="logout">
      {{ $t('login') }}
    </button>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  // middleware: 'auth',
  mounted () {
    this.$api.categories.getAll()
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push(this.localePath('login'))
    }
  }
}
</script>
