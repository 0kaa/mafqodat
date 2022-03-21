<template>
  <v-row justify="center" align="center">
    <button @click="logout">
      logout
    </button>
  </v-row>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
