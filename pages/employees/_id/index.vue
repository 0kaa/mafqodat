<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('editEmployee')" />
    <v-row justify="space-between">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="updateEmployee()"
          >
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="employee.first_name"
                    :label="$t('firstName')"
                    :rules="rules().first_name"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="employee.family_name"
                    :label="$t('familyName')"
                    :rules="rules().family_name"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="employee.address"
                    :label="$t('address')"
                    :rules="rules().address"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="employee.post_code"
                    :label="$t('postCode')"
                    :rules="rules().post_code"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="employee.country"
                    :items="countries"
                    outlined
                    :label="$t('country')"
                    item-text="name"
                    item-value="id"
                    return-object
                    :rules="rules().country"
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
                <v-col>
                  <v-select
                    v-model="employee.city"
                    :items="cities && cities.length ? cities : []"
                    outlined
                    :label="$t('city')"
                    item-text="name"
                    item-value="id"
                    return-object
                    :disabled="!employee.country"
                    :rules="rules().city"
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="employee.phone"
                    :label="$t('phone')"
                    :rules="rules().phone"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="employee.mobile"
                    :label="$t('mobile')"
                    :rules="rules().mobile"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="employee.email"
                    :label="$t('email')"
                    :rules="rules().email"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="employee.password"
                    :label="$t('password')"
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    required
                    color="black"
                    background-color="white"
                    @click:append="showPassword = !showPassword"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    v-model="employee.permissions"
                    :items="permissions"
                    :label="$t('permissions')"
                    item-text="name"
                    item-value="value"
                    background-color="white"
                    :menu-props="{ top: true, offsetY: true }"
                    multiple
                    outlined
                  >
                    <template #selection="{ item, index }">
                      <v-chip v-if="index === 0">
                        <span>{{ item.name }}</span>
                      </v-chip>
                      <span
                        v-if="index === 1"
                        class="grey--text text-caption"
                      >
                        (+{{ employee.permissions.length - 1 }} others)
                      </span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="justify-start">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="px-14 py-6 font-weight-light login-btn"
                :loading="loading"
              >
                {{ $t('saveData') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-col>
    </v-row>
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
  middleware ({ $auth, redirect }) {
    if (!$auth.user.permissions.includes('update_employee')) {
      return redirect('/employees')
    }
  },
  async asyncData ({ redirect, params, $auth, $api }) {
    try {
      if (params.id.toString() === $auth.user.id.toString()) {
        redirect('/profile')
      } else if (params.id === '1') {
        redirect('/employees')
      }
      const employee = await $api.employees.get(params.id)
      const countires = await $api.countries.getAll()
      const permissions = await $api.auth.permissions()
      return {
        employee: employee.data.data,
        countries: countires.data.data.data,
        permissions: permissions.data.data
      }
    } catch (e) {
      redirect('/employees')
    }
  },
  data: () => ({
    valid: true,
    employee: {
      first_name: '',
      family_name: '',
      address: '',
      second_address: '',
      country_id: '',
      city_id: '',
      phone: '',
      mobile: '',
      email: '',
      post_code: '',
      password: '',
      permissions: []
    },
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    showPassword: false,
    loading: false,
    countries: [],
    permissions: []
  }),

  computed: {
    cities () {
      return this.employee.country ? this.employee.country.cities : []
    }
  },

  methods: {
    updateEmployee () {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true
          const employeeData = {
            first_name: this.employee.first_name,
            family_name: this.employee.family_name,
            address: this.employee.address,
            second_address: this.employee.second_address,
            country_id: this.employee.country.id,
            city_id: this.employee.city.id,
            phone: this.employee.phone,
            mobile: this.employee.mobile,
            email: this.employee.email,
            post_code: this.employee.post_code,
            password: this.employee.password,
            permissions: this.employee.permissions
          }
          this.$api.employees.update(this.employee.id, employeeData).then((response) => {
            this.loading = false
            this.snackbar = true
            this.snackbarColor = 'green'
            this.snackbarText = response.data.message
          }).catch((err) => {
            this.loading = false
            this.snackbarColor = 'red'
            this.snackbarText = err.response.data.message
            this.snackbar = true
          })
        }
      } catch (error) {
        this.snackbar = true
        this.snackbarText = error.response.data.message
        this.snackbarColor = 'red'
      }
    },
    rules () {
      return {
        first_name: [
          v => !!v || this.$t('firstNameRequired'),
          v => (v && v.length >= 3) || this.$t('firstNameMinLength')
        ],
        family_name: [
          v => !!v || this.$t('familyNameRequired'),
          v => (v && v.length >= 3) || this.$t('familyNameMinLength')
        ],
        email: [
          v => !!v || this.$t('emailRequired'),
          v => /.+@.+\..+/.test(v) || this.$t('emailValid')
        ],
        address: [
          v => !!v || this.$t('addressRequired'),
          v => (v && v.length >= 3) || this.$t('addressMinLength')
        ],
        phone: [
          v => !!v || this.$t('phoneRequired'),
          v => (v && v.length >= 8) || this.$t('phoneMinLength')
        ],
        mobile: [
          v => !!v || this.$t('mobileRequired'),
          v => (v && v.length >= 8) || this.$t('mobileMinLength')
        ],
        country: [
          v => !!v || this.$t('countryRequired')
        ],
        city: [
          v => !!v || this.$t('cityRequired')
        ]
      }
    }
  }
}
</script>
