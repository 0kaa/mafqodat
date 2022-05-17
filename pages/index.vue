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
      <div class="text-left main-text">
        {{ $t('viewAll') }}
      </div>

      <VueSlickCarousel v-if="categories && categories.length" v-bind="settings">
        <Category v-for="(category ,i) in categories" :key="i" :category="category" />
      </VueSlickCarousel>
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'Home',
  components: { VueSlickCarousel },
  data: () => ({
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',

    loading: false,
    settings: {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      focusOnSelect: true,
      touchThreshold: 5,
      rtl: true
    },
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
  created () {
    this.settings.rtl = this.$i18n.locale === 'ar'
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
