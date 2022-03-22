<template>
  <v-row justify="center" align="center">
    <button @click="logout">
      logout
    </button>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  middleware: 'auth',
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
