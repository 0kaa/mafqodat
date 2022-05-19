<template>
  <div>
    <div class="categories-list mb-9">
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

    <div class="d-flex justify-space-between">
      <h2 class="main-title mb-6" v-text="$t('itemsArchive')" />
      <div class="d-flex gap-4 filter-section">
        <input
          v-model="search"
          type="text"
          class="search-input"
          :placeholder="$t('search')"
        >
        <v-btn
          color="primary"
          depressed
          :rounded="false"
          class="pa-0 rounded-lg"
          min-width="48"
          min-height="48"
          @click="filterOpen = !filterOpen"
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <FilterSearch v-if="filterOpen" :stations="stations" :filter-data="filterData" @filter="filterTable" />
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="items"
        :page.sync="page"
        :items-per-page="meta.per_page"
        hide-default-footer
        :loading="loading"
        class="elevation-2"
        :no-data-text="$t('noData')"
        :custom-filter="filterTable"
      >
        <template v-if="$auth.loggedIn && ($auth.user.permissions.includes('update_item') || $auth.user.permissions.includes('delete_item'))" #[`item.actions`]="{ item }">
          <div class="d-flex gap-2">
            <v-btn v-if="$auth.loggedIn && $auth.user.permissions.includes('update_item')" :to="localePath(`/items/${item.id}`)" class="primary--text" elevation="0" small>
              {{ $t('edit') }}
            </v-btn>
            <v-btn v-if="$auth.loggedIn && $auth.user.permissions.includes('delete_item')" class="error--text" elevation="0" small @click="deleteItem(item.id)">
              {{ $t('delete') }}
            </v-btn>
          </div>
        </template>
      </v-data-table>
      <div class="text-center pt-8">
        <v-pagination
          v-if="meta.last_page > 1"
          v-model="page"
          :length="meta.last_page"
        />
      </div>
    </div>

    <v-snackbar v-model="snackbar" :timeout="8000" :color="snackbarColor">
      {{ snackbarText }}
      <template #action="{ attrs }">
        <v-btn
          class="v-btn--active"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          {{ $t('close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  async asyncData ({ $api, params, redirect }) {
    try {
      const categories = await $api.categories.all()
      const item = await $api.categories.items(params.id)
      const stations = await $api.stations.all()
      return {
        categories: categories.data.data,
        items: item.data.data.data,
        coreItems: item.data.data.data,
        meta: item.data.data.meta,
        links: item.data.data.links,
        stations: stations.data.data
      }
    } catch (error) {
      return redirect('/categories')
    }
  },
  data: () => ({
    filterData: {},
    filterOpen: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    loading: false,
    categories: [],
    search: '',
    page: 1,
    meta: {},
    links: {},
    items: [],
    coreItems: []
  }),
  computed: {
    headers () {
      return [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('date'), value: 'fulldate' },
        { text: this.$t('category'), value: 'category.name' },
        { text: this.$t('stationName'), value: 'station.name' },
        { text: this.$t('stationNumber'), value: 'station.number' },
        { text: this.$t('stationLocation'), value: 'station.location' },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  watch: {
    page: {
      handler (page) {
        this.getAllItems(page)
      },
      deep: true
    },
    search: {
      handler (search) {
        if (search.length > 2) {
          this.items = this.items.filter((item) => {
            return item.station.name.toLowerCase().includes(search.toLowerCase())
          })
        } else {
          this.items = this.coreItems
        }
      },
      deep: true
    }
  },
  methods: {
    filterTable (value) {
      if (value) {
        this.filterData = value
        this.items = this.coreItems.filter((item) => {
          if (value.station_id && !value.from && !value.to) {
            return item.station.id === value.station_id.id
          } else if (value.station_id && value.from && value.to) {
            return item.station.id === value.station_id.id && item.date >= value.from && item.date <= value.to
          } else if (!value.station_id && value.from && value.to) {
            return item.date >= value.from && item.date <= value.to
          } else {
            return true
          }
        })
        this.filterOpen = false
      }
    },
    async deleteItem (id) {
      try {
        const response = await this.$api.items.delete(id)
        this.snackbar = true
        this.snackbarText = response.data.message
        this.snackbarColor = 'green'
        this.$fetch()
      } catch (e) {
        this.snackbar = true
        this.snackbarText = e.response.data.message
        this.snackbarColor = 'red'
      }
    },
    async getAllItems (page) {
      this.loading = true
      await this.fetchItems(page)
      this.loading = false
    },
    async fetchItems (page) {
      const response = await this.$api.items.getAll(page)
      this.items = response.data.data.data
      this.meta = response.data.data.meta
      this.links = response.data.data.links
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-section {
    gap:16px;
    margin-bottom:60px;
    position: relative;
    .search-input {
        border: 1px solid #F6931E;
        color:#F6931E;
        height:48px;
        border-radius: 8px;
        outline:none;
        padding:16px;
        &::placeholder {
            color:#F6931E
        }
    }

}
</style>
