<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('editItem')" />
    <v-row justify="space-between">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="updateItem"
          >
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="item.category"
                    :items="categories"
                    outlined
                    :label="$t('itemType')"
                    item-text="name"
                    item-value="value"
                    return-object
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                    :rules="rules().itemCategory"
                  />
                </v-col>
                <v-col v-if="item.category && item.category.slug === 'other'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.type"
                    :label="$t('writeItemType')"
                    :rules="rules().itemType"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col v-if="item.category && item.category.slug === 'money'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.cost"
                    :label="$t('lostItemCost')"
                    :rules="rules().itemCost"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="item.station"
                    :items="stations"
                    outlined
                    :label="$t('chooseStation')"
                    item-text="name"
                    item-value="value"
                    return-object
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                    :rules="rules().stationType"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-dialog
                    ref="dialog"
                    v-model="modalDate"
                    :return-value.sync="item.date"
                    persistent
                    width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="item.date"
                        :label="$t('lostDate')"
                        readonly
                        outlined
                        color="black"
                        background-color="white"
                        :rules="rules().itemDate"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="item.date"
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="modalDate = false"
                      >
                        {{ $t('cancel') }}
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(item.date)"
                      >
                        {{ $t('ok') }}
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-dialog
                    ref="lostTime"
                    v-model="modalTime"
                    :return-value.sync="item.time"
                    persistent
                    width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="item.time"
                        :label="$t('lostTime')"
                        outlined
                        readonly
                        color="black"
                        background-color="white"
                        v-bind="attrs"
                        :rules="rules().itemTime"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker v-if="modalTime" v-model="item.time" full-width>
                      <v-spacer />
                      <v-btn text color="primary" @click="modalTime = false">
                        {{ $t('cancel') }}
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.lostTime.save(item.time)">
                        {{ $t('ok') }}
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.storage"
                    :label="$t('storagePlace')"
                    :rules="rules().storage"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-textarea
                    v-model="item.details"
                    rows="2"
                    auto-grow
                    :label="$t('details')"
                    :rules="rules().details"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-checkbox
                v-model="item.is_delivered"
                class="mt-4"
                :label="$t('isDelivered')"
                :value="1"
              />
              <div v-if="item.is_delivered">
                <h2 class="holder-title">
                  {{ $t('addItemHolderDetails') }}
                </h2>
                <v-row>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.first_name"
                      :label="$t('firstName')"
                      outlined
                      required
                      :rules="rules().first_name"
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.surname"
                      :label="$t('familyName')"
                      outlined
                      required
                      :rules="rules().family_name"
                      color="black"
                      background-color="white"
                    />
                  </v-col>

                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.email"
                      :label="$t('email')"
                      outlined
                      required
                      :rules="rules().email"
                      color="black"
                      background-color="white"
                    />
                  </v-col>

                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.address"
                      :label="$t('address')"
                      outlined
                      required
                      :rules="rules().address"
                      color="black"
                      background-color="white"
                    />
                  </v-col>

                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.phone"
                      :label="$t('phone')"
                      :rules="rules().phone"
                      type="text"
                      name="phone-number"
                      outlined
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.mobile"
                      :label="$t('mobile')"
                      :rules="rules().mobile"
                      type="text"
                      name="phone-number"
                      outlined
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.user.fullname"
                      :label="$t('employeeName')"
                      disabled
                      outlined
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                </v-row>
              </div>
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
            v-if="!item.image && !imgPreview"
            class="d-flex align-center text-center"
            src="/item_image.png"
            @click="onButtonClick"
          />
          <v-img
            v-if="item.image && !imgPreview"
            :src="item.image"
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
            {{ $t('uploadImage') }}
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
  middleware ({ $auth, redirect }) {
    if ($auth.loggedIn && !$auth.user.permissions.includes('update_item')) {
      return redirect('/items')
    }
  },
  async asyncData ({ $api, params, redirect }) {
    try {
      const categories = await $api.categories.all()
      const stations = await $api.stations.all()
      const item = await $api.items.get(params.id)
      const countires = await $api.countries.getAll()
      return {
        categories: categories.data.data,
        stations: stations.data.data,
        item: item.data.data,
        countries: countires.data.data.data
      }
    } catch (error) {
      return redirect('/items')
    }
  },
  data: () => ({
    menu: false,
    modalDate: false,
    modalTime: false,
    mapLatLng: '',
    place: '',
    mapCenter: {
      lat: -8.504455,
      lng: 115.262349
    },
    imgPreview: '',
    google: '',
    map: '',
    valid: true,
    item: {
      category: '',
      station: '',
      type: '',
      cost: '',
      date: '',
      time: '',
      details: '',
      storage: '',
      location: '',
      image: '',
      user: '',
      lat: '',
      country: [],
      city: [],
      lng: '',
      is_delivered: 0
    },
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    loading: false
  }),

  computed: {
    cities () {
      return this.item.country ? this.item.country.cities : []
    },

    stationTypes () {
      return [
        {
          name: this.$t('metro'),
          value: 'metro'
        },
        {
          name: this.$t('bus'),
          value: 'bus'
        }
      ]
    }
  },

  methods: {
    onButtonClick () {
      this.isSelecting = true
      window.addEventListener('focus', () => { this.isSelecting = false }, { once: true })
      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      this.item.image = e.target.files[0]
      if (this.item.image) { this.imgPreview = URL.createObjectURL(e.target.files[0]) } else { this.imgPreview = '' }
    },
    async updateItem () {
      this.loading = true
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        try {
          const formData = new FormData()
          for (const key in this.item) {
            if (key === 'category' || key === 'station') {
              formData.append(key + '_id', this.item[key].id)
            } else {
              formData.append(key, this.item[key])
            }
          }
          if (this.item.is_delivered !== 1) {
            formData.append('is_delivered', 0)
          }
          const response = await this.$api.items.update(this.item.id, formData)
          this.snackbar = true
          this.snackbarText = response.data.message
          this.snackbarColor = 'green'
          this.loading = false
        } catch (error) {
          this.snackbar = true
          this.snackbarText = error
          console.log(error)
          this.snackbarColor = 'red'
          this.loading = false
        }
      } else {
        this.snackbar = true
        this.snackbarText = this.$t('pleaseFillAllFields')
        this.snackbarColor = 'red'
        this.loading = false
      }
    },
    rules () {
      return {
        itemCategory: [
          v => !!v || this.$t('pleaseSelectCategory')
        ],
        itemType: [
          v => (this.item.category && this.item.category.slug === 'other' && !!v) || this.$t('pleaseSelectType')
        ],
        itemCost: [
          v => (this.item.category && this.item.category.slug === 'money' && !!v && v.match(/^[0-9]*\.?[0-9]*$/)) || this.$t('pleaseFillCost')
        ],
        stationType: [
          v => !!v || this.$t('pleaseSelectStationType')
        ],
        itemDate: [
          v => !!v || this.$t('pleaseFillDate')
        ],
        itemTime: [
          v => !!v || this.$t('pleaseFillTime')
        ],
        storage: [
          v => !!v || this.$t('pleaseFillStorage')
        ],
        details: [
          v => !!v || this.$t('pleaseFillDetails')
        ],
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
        ]

      }
    }
  }
}
</script>
<style lang="scss" scoped>
.user-profile-container {
  max-height: 100%;
  border: 2px dashed #ABABAB;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
}
.holder-title {
  font-size: 24px;
  font-weight: 300;
  margin-bottom:44px;
  color:#505050
}
</style>
