<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('addNewEmployee')" />
    <v-row justify="space-between">
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
                <v-col>
                  <v-select
                    v-model="station.type"
                    :items="stationTypes"
                    outlined
                    :label="$t('stationType')"
                    item-text="name"
                    item-value="id"
                    return-object
                    :rules="rules().stationType"
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="station.number"
                    :label="$t('stationNumber')"
                    :rules="rules().number"
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
                    v-model="station.name_ar"
                    :label="$t('stationNameAr')"
                    :rules="rules().name_ar"
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="station.name_en"
                    :label="$t('stationNameEn')"
                    :rules="rules().name_en"
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

  data: () => ({
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
    updateProfile () {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true
          this.$api.stations.create(this.station).then((response) => {
            this.loading = false
            this.snackbar = true
            this.snackbarColor = 'green'
            this.snackbarText = response.data.message
            this.$refs.form.reset()
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

      }
    }
  }
}
</script>
