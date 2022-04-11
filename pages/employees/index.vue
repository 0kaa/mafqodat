<template>
  <div>
    <div class="d-flex justify-space-between">
      <h2 class="main-title mb-6" v-text="$t('employeesArchive')" />
      <div class="d-flex gap-4 filter-section">
        <input type="text" class="search-input" :placeholder="$t('search')">
        <v-btn
          color="primary"
          depressed
          :rounded="false"
          class="pa-0 rounded-lg"
          min-width="48"
          min-height="48"
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </div>
    </div>
    <div>
      <v-data-table
        :headers="headers"
        :items="employees"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        :server-items-length="itemsPerPage"
        :loading="loading"
        class="elevation-1"
        @page-count="pageCount = $event"
      />
      <div class="text-center pt-2">
        <v-pagination
          v-model="page"
          :length="pageCount"
        />
        <v-text-field
          :value="itemsPerPage"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
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
  name: 'EmployeesArchive',
  data: () => ({
    page: 1,
    pageCount: 2,
    itemsPerPage: 5,
    options: {},
    employees: [],
    totalEmployees: 0,
    valid: true,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    showPassword: false,
    loading: false
  }),
  async fetch () {
    await this.getAllEmployees()
  },
  computed: {
    headers () {
      return [
        { text: this.$t('id'), value: 'id' },
        { text: this.$t('fullName'), value: 'full_name' },
        { text: this.$t('phone'), value: 'phone' },
        { text: this.$t('mobile'), value: 'mobile' },
        { text: this.$t('email'), value: 'email' },
        { text: this.$t('country'), value: 'country.name' },
        { text: this.$t('city'), value: 'city.name' }
      ]
    }
  },
  watch: {
    options: {
      handler () {
        this.getAllEmployees()
      },
      deep: true
    }
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },

  methods: {
    async getAllEmployees () {
      this.loading = true
      await this.fetchEmployees()
      this.loading = false
    },
    async fetchEmployees () {
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options
      const response = await this.$api.employees.getAll()
      const items = response.data.data.data
      const total = items.length
      // if (sortBy.length === 1 && sortDesc.length === 1) {
      //   items = items.sort((a, b) => {
      //     const sortA = a[sortBy[0]]
      //     const sortB = b[sortBy[0]]

      //     if (sortDesc[0]) {
      //       if (sortA < sortB) { return 1 }
      //       if (sortA > sortB) { return -1 }
      //       return 0
      //     } else {
      //       if (sortA < sortB) { return -1 }
      //       if (sortA > sortB) { return 1 }
      //       return 0
      //     }
      //   })
      // }

      // if (itemsPerPage > 0) {
      //   items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      // }

      this.employees = items
      this.totalEmployees = total
    }

  }
}
</script>

<style lang="scss" scoped>
.filter-section {
    gap:16px;
    margin-bottom:60px;
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
