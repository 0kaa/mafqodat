<template>
  <div>
    <div class="d-flex justify-space-between">
      <h2 class="main-title mb-6" v-text="$t('employeesArchive')" />
      <div class="d-flex gap-4 filter-section">
        <input v-model="search" type="text" class="search-input" :placeholder="$t('search')">
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
        :items-per-page="meta.per_page"
        hide-default-footer
        :loading="loading"
        :search="search"
        class="elevation-2"
      >
        <template #[`item.actions`]="{ item }">
          <v-btn :to="localePath(`/employees/${item.id}`)" class="me-4 primary--text" small elevation="0">
            {{ $t('preview') }}
          </v-btn>
          <v-btn class="error--text" small elevation="0" @click="deleteEmployee(item.id)">
            {{ $t('delete') }}
          </v-btn>
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
  name: 'EmployeesArchive',
  data: () => ({
    search: '',
    page: 1,
    meta: {},
    links: {},
    employees: [],
    valid: true,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    showPassword: false,
    loading: false
  }),
  async fetch () {
    await this.getAllEmployees(this.page)
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
        { text: this.$t('city'), value: 'city.name' },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },
  watch: {
    page: {
      handler (page) {
        this.getAllEmployees(page)
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
    async deleteEmployee (id) {

    },
    async getAllEmployees (page) {
      this.loading = true
      await this.fetchEmployees(page)
      this.loading = false
    },
    async fetchEmployees (page) {
      const response = await this.$api.employees.getAll(page)
      this.employees = response.data.data.data
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
