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
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="station.number"
                    :label="$t('stationNumber')"
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
    rules () {
      return {

      }
    }
  }
}
</script>
