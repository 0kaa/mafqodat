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
    <h2 class="main-title mb-6" v-text="$t('mainCategories')" />
    <div class="categories-list">
      <nuxt-link
        :to="localePath('/categories')"
        class="main-text d-block"
        :class="{
          'text-left': $vuetify.rtl,
          'text-right': !$vuetify.rtl
        }"
      >
        {{ $t('viewAll') }}
      </nuxt-link>

      <v-row v-if="categoriesList && categoriesList.length">
        <v-col v-for="(category ,i) in categoriesList" :key="i">
          <Category :category="category" />
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col lg="8" cols="12">
        <h3 class="text-latest-items">
          {{ $t('latestItems') }}
        </h3>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-default-footer
          :loading="loading"
          class="elevation-2"
          :no-data-text="$t('noData')"
        />
      </v-col>
      <v-col lg="4" cols="12">
        <h3 class="text-latest-items">
          {{ $t('locations') }}
        </h3>
        <Locations :locations="locations" />
      </v-col>
    </v-row>
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
    categories: [],
    items: [],
    locations: []
  }),
  async fetch () {
    const categories = await this.$api.categories.all()
    const items = await this.$api.items.latest()
    const locations = await this.$api.items.locations()
    this.categories = categories.data.data
    this.items = items.data.data
    this.locations = locations.data.data
  },
  computed: {
    categoriesList () {
      return this.categories.slice(0, 5)
    },
    headers () {
      return [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('date'), value: 'fulldate' },
        { text: this.$t('category'), value: 'category.name' },
        { text: this.$t('stationName'), value: 'station.name' },
        { text: this.$t('stationNumber'), value: 'station.number' },
        { text: this.$t('stationLocation'), value: 'station.location' }
      ]
    }
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch()
    }
  }

}
</script>

<style lang="scss" scoped>
.categories-list {
  margin-bottom: 44px;
  padding-top:0px;
  padding-bottom:0px;
  .main-text {
    margin-bottom:15px;
  }
}
.text-latest-items {
  font-size:20px;
  margin-bottom:25px;
  color:#505050;
}
</style>
