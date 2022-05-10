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
        Error while fetching mountains
      </p>
    </div>
    <h2 v-if="user && Object.keys(user).length" class="main-title mb-6" v-text="$t('profile')" />
    <v-row v-if="user && Object.keys(user).length" justify="space-between">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="updateProfile()"
          >
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.first_name"
                    :label="$t('firstName')"
                    :rules="rules().first_name"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.family_name"
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
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.address"
                    :label="$t('address')"
                    :rules="rules().address"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.second_address"
                    :label="$t('anotherAddress')"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="user.country"
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
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="user.city"
                    :items="user.country.cities"
                    outlined
                    :label="$t('city')"
                    item-text="name"
                    item-value="id"
                    return-object
                    :rules="rules().city"
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.phone"
                    :label="$t('phone')"
                    :rules="rules().phone"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.mobile"
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
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.email"
                    :label="$t('email')"
                    :rules="rules().email"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.post_code"
                    :label="$t('postCode')"
                    :rules="rules().post_code"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
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
      <v-col lg="3" cols="12" order="1" order-lg="2" class="py-0">
        <div class="user-profile-container">
          <v-img
            v-if="!user.image && !imgPreview"
            class="d-flex align-center text-center"
            src="/arab.png"
          />
          <v-img
            v-if="user.image && !imgPreview"
            :src="user.image"
            class="user-profile"
            @click="onButtonClick"
          />
          <v-img
            v-if="imgPreview"
            :src="imgPreview"
            class="user-profile"
            @click="onButtonClick"
          />
        </div>
        <div class="mt-5 d-flex justify-center">
          <input
            ref="uploader"
            class="d-none"
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            @change="onFileChanged"
          >
          <v-btn color="primary" text x-large class="text-capitalize" @click="onButtonClick">
            {{ $t('changeProfilePicture') }}
          </v-btn>
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

  data: () => ({
    valid: true,
    user: {},
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    isSelecting: false,
    imgPreview: '',
    showPassword: false,
    loading: false,
    countries: []
  }),
  async fetch () {
    await this.$auth.fetchUser()
    const countires = await this.$api.countries.getAll()
    this.user = { ...this.$auth.$state.user }
    this.countries = countires.data.data.data
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  methods: {
    onButtonClick () {
      this.isSelecting = true
      window.addEventListener('focus', () => { this.isSelecting = false }, { once: true })
      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      this.user.image = e.target.files[0]
      if (this.user.image) { this.imgPreview = URL.createObjectURL(e.target.files[0]) } else { this.imgPreview = '' }
    },
    updateProfile () {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true
          const formData = new FormData()
          if (this.imgPreview) { formData.append('image', this.user.image) }

          const userData = {
            first_name: this.user.first_name,
            family_name: this.user.family_name,
            address: this.user.address,
            second_address: this.user.second_address,
            country_id: this.user.country.id,
            city_id: this.user.city.id,
            phone: this.user.phone,
            mobile: this.user.mobile,
            email: this.user.email,
            post_code: this.user.post_code
          }
          for (const key in userData) {
            if (userData[key]) {
              formData.append(key, userData[key])
            }
          }
          this.$api.auth.updateProfile(formData).then((response) => {
            this.loading = false
            this.snackbar = true
            this.snackbarColor = 'green'
            this.snackbarText = response.data.message
            this.$auth.fetchUser()
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
          v => !!v || this.$t('firstNameRequired')
        ],
        family_name: [
          v => !!v || this.$t('familyNameRequired')
        ],
        password: [
          v => !!v || this.$t('passwordRequired'),
          v => (v && v.length >= 6) || this.$t('passwordMinLength')
        ],
        country: [
          v => !!v || this.$t('emailRequired')
        ],
        city: [
          v => !!v || this.$t('emailRequired')
        ],
        email: [
          v => !!v || this.$t('emailRequired'),
          v => /.+@.+\..+/.test(v) || this.$t('emailValid')
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile-container {
  max-width: 100%;
  border: 1px solid #F6931E;
  border-radius: 8px;
  overflow: hidden;
  padding:10px;

}
</style>
