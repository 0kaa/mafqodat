<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('addNewStation')" />
    <v-row justify="space-between">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="updateStation"
          >
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="station.type"
                    :items="stationTypes"
                    outlined
                    :label="$t('stationType')"
                    item-text="name"
                    item-value="value"
                    return-object
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                    :rules="rules().stationType"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="station.number"
                    :label="$t('stationNumber')"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                    :rules="rules().stationNumber"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="station.name_ar"
                    :label="$t('stationNameAr')"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                    :rules="rules().stationNameAr"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="station.name_en"
                    :label="$t('stationNameEn')"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                    :rules="rules().stationNameEn"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-textarea
                    v-model="station.description"
                    :label="$t('stationDescription')"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <gmap-autocomplete
                class="autocomplete-input"
                :value="station.location"
                :placeholder="$t('stationLocation')"
                @place_changed="updatePlace"
              />
              <google-map
                :center="mapCenter"
                :zoom="15"
                style="width: 100%; height: 400px"
                @click="setLocation"
              >
                <google-maker
                  :position="mapCenter"
                  :draggable="true"
                  @dragend="dragMarker"
                  @click="dragMarker"
                />
              </google-map>
            </v-card-text>

            <v-card-actions class="justify-start">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="px-14 py-6 mt-6 font-weight-light login-btn"
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
import { gmapApi } from '~/node_modules/vue2-google-maps'

export default {
  middleware ({ $auth, redirect }) {
    if ($auth.loggedIn && !$auth.user.permissions.includes('update_station')) {
      return redirect('/stations')
    }
  },
  async asyncData ({ params, $api, redirect }) {
    try {
      const station = await $api.stations.get(params.id)
      return {
        station: station.data.data,
        mapCenter: {
          lat: station.data.data.lat,
          lng: station.data.data.lng
        }
      }
    } catch (e) {
      redirect('/stations')
    }
  },
  data: () => ({
    mapLatLng: '',
    place: '',
    mapCenter: {
      lat: -8.504455,
      lng: 115.262349
    },
    google: '',
    map: '',
    valid: true,
    station: {
      type: '',
      name_ar: '',
      name_en: '',
      number: '',
      description: '',
      location: '',
      lat: '',
      lng: ''
    },
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    loading: false
  }),

  computed: {
    googleM () {
      return gmapApi()
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
  mounted () {
    navigator.geolocation.getCurrentPosition((position) => {
      this.mapCenter.lat = position.coords.latitude
      this.mapCenter.lng = position.coords.longitude
    })
    setTimeout(() => {
      this.mapCenter.lat = +this.station.lat
      this.mapCenter.lng = +this.station.lng
    }, 1000)
  },
  methods: {
    dragMarker (e) {
      const geocoder = new this.googleM.maps.Geocoder()
      this.station.lat = e.latLng.lat()
      this.station.lng = e.latLng.lng()
      geocoder.geocode(
        { latLng: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
        (responses) => { if (responses && responses.length > 0) { this.station.location = responses[0].formatted_address } }
      )
    },
    setLocation (e) {
      this.mapCenter.lat = e.latLng.lat()
      this.mapCenter.lng = e.latLng.lng()
      this.place = e.placeId
      this.dragMarker(e)
    },
    updateCenter (location) {
      this.mapCenter = {
        lat: location.lat(),
        lng: location.lng()
      }
      this.station.lat = location.lat()
      this.station.lng = location.lng()
    },
    updatePlace (place) {
      this.updateCenter(place.geometry.location)
      this.station.location = place.formatted_address
    },
    updateStation () {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true
          const stationData = {
            type: this.station.type.value,
            name_ar: this.station.name_ar,
            name_en: this.station.name_en,
            number: this.station.number,
            description: this.station.description,
            location: this.station.location,
            lat: this.station.lat,
            lng: this.station.lng
          }
          this.$api.stations.update(this.station.id, stationData).then((response) => {
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
    async createStation () {
      this.loading = true
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        try {
          const response = await this.$api.stations.create(this.station)
          this.snackbar = true
          this.snackbarText = response.data.message
          this.snackbarColor = 'green'
          this.loading = false
        } catch (error) {
          this.snackbar = true
          this.snackbarText = error.response.data.message
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
        stationType: [
          v => !!v || this.$t('stationTypeRequired')
        ],
        stationNumber: [
          v => !!v || this.$t('stationNumberRequired'),
          v => /^[0-9]*$/.test(v) || this.$t('stationNumberRequired')
        ],
        stationNameEn: [
          v => !!v || this.$t('stationNameEnRequired'),
          v => /^[a-zA-Z\s]*$/.test(v) || this.$t('stationNameEnAcceptEnglish')
        ],
        stationNameAr: [
          v => !!v || this.$t('stationNameArRequired'),
          v => /^[\u0621-\u064A\s]*$/.test(v) || this.$t('stationNameArAcceptArabic')
        ]
      }
    }
  }
}
</script>
