<template>
  <div>
    <div>
      <v-overlay :value="$fetchState.pending" absolute opacity="0.1" z-index="1000">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        />
      </v-overlay>
      <p v-if="$fetchState.error">
        Error while fetching data
      </p>
    </div>
    <h2 class="main-title mb-6" v-text="$t('allCategories')" />
    <div class="categories-list">
      <v-row v-if="categories && categories.length">
        <v-col
          v-for="(category ,i) in categories"
          :key="i"
          cols="12"
          lg="2"
          md="3"
          sm="4"
        >
          <Category :category="category" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    loading: false,
    categories: []
  }),
  async fetch () {
    const categories = await this.$api.categories.all()
    this.categories = categories.data.data
  },

  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch()
    }
  }

}
</script>
