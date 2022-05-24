<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('addNewItem')" />
    <v-row justify="space-between">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="createItem"
          >
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="item.category_id"
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
                <v-col v-if="item.category_id && item.category_id.slug === 'other'" lg="6" cols="12" class="py-0">
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
                <v-col v-if="item.category_id && item.category_id.slug === 'money'" lg="6" cols="12" class="py-0">
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
                    v-model="item.station_id"
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
                <v-col lg="6" cols="12" class="pt-0">
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
                <v-col lg="6" cols="12" class="pt-0">
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

              <gmap-autocomplete
                :value="item.location"
                class="autocomplete-input"
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
    <v-dialog
      v-model="dialog"
      width="720"
    >
      <div class="main-dialog">
        <div>
          <h3 class="dialog-title">
            {{ $t('itemAdded') }}
          </h3>
          <div ref="qrcode" class="d-flex justify-space-between">
            <div v-if="dialogItem && Object.keys(dialogItem).length" class="dialog-items">
              <div class="dialog-item">
                <span>
                  {{ $t('category') }}
                </span>
                <div class="dialog-item-category">
                  <h3>{{ dialogItem.category.name }}</h3>
                  <img :src="dialogItem.category.image">
                </div>
              </div>

              <div class="dialog-item">
                <span>
                  {{ $t('details') }}
                </span>
                <div class="dialog-item-details">
                  <h3>{{ dialogItem.details }}</h3>
                </div>
              </div>

              <div class="dialog-item">
                <span>
                  {{ $t('stationName') }}
                </span>
                <div class="dialog-item-station">
                  <h3>{{ dialogItem.station.name }}</h3>
                </div>
              </div>
            </div>
            <canvas id="canvas" ref="canvas" class="canvas" />
          </div>
          <v-btn
            color="primary"
            elevation="1"
            class="px-14 py-6 mt-6 font-weight-light"
            @click="print()"
          >
            {{ $t('print') }}
          </v-btn>
        </div>
      </div>
    </v-dialog>
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
import Vue from 'vue'
import VueMeta from 'vue-meta'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { gmapApi } from '~/node_modules/vue2-google-maps'
Vue.use(VueMeta)

export default {
  async asyncData ({ $api }) {
    const categories = await $api.categories.all()
    const stations = await $api.stations.all()
    return {
      categories: categories.data.data,
      stations: stations.data.data
    }
  },
  data: () => ({
    QRCodeModuleLoaded: false,
    url: '',
    dialog: false,
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
      category_id: '',
      station_id: '',
      type: '',
      cost: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: '',
      details: '',
      storage: '',
      location: '',
      image: '',
      lat: '',
      lng: ''
    },
    dialogItem: {},
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    loading: false
  }),
  head () {
    return {
      script: [
        {
          hid: 'QRCode',
          src:
            'https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/resources/script/qrcode.min.js',
          defer: true,
          callback: () => {
            this.QRCodeModuleLoaded = true
          }
        },
        {
          hid: 'jsPDF',
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
          defer: true
        }
      ]
    }
  },

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
  },
  methods: {
    print () {
      const data = this.$refs.qrcode
      html2canvas(data, {
        useCORS: true,
        allowTaint: true
      }).then((canvas) => {
        const myImage = canvas.toDataURL('image/jpeg,1.0')
        const imgWidth = (canvas.width * 60) / 240
        const imgHeight = (canvas.height * 70) / 240
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF('p', 'mm', 'a4')
        pdf.addImage(myImage, 'png', 15, 2, imgWidth, imgHeight)

        pdf.save('qrcode.pdf')
      })
    },
    async getQRCode () {
      const options = {
        width: 130,
        height: 130,
        errorCorrectionLevel: 'L',
        type: 'image/png',
        rendererOpts: {
          quality: 1
        }
      }
      /* global QRCode */
      await QRCode.toCanvas(this.$refs.canvas, this.url, options)
    },
    onButtonClick () {
      this.isSelecting = true
      window.addEventListener('focus', () => { this.isSelecting = false }, { once: true })
      this.$refs.uploader.click()
    },
    onFileChanged (e) {
      this.item.image = e.target.files[0]
      if (this.item.image) { this.imgPreview = URL.createObjectURL(e.target.files[0]) } else { this.imgPreview = '' }
    },
    dragMarker (e) {
      const geocoder = new this.googleM.maps.Geocoder()
      this.item.lat = e.latLng.lat()
      this.item.lng = e.latLng.lng()
      geocoder.geocode(
        { latLng: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
        (responses) => { if (responses && responses.length > 0) { this.item.location = responses[0].formatted_address } }
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
      this.item.lat = location.lat()
      this.item.lng = location.lng()
    },
    updatePlace (place) {
      this.updateCenter(place.geometry.location)
      this.item.location = place.formatted_address
    },
    createItem () {
      this.loading = true
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        try {
          const formData = new FormData()
          for (const key in this.item) {
            if (key === 'category_id' || key === 'station_id') {
              formData.append(key, this.item[key].id)
            } else {
              formData.append(key, this.item[key])
            }
          }
          this.$api.items.create(formData).then((response) => {
            this.snackbar = true
            this.snackbarText = response.data.message
            this.snackbarColor = 'green'
            this.loading = false
            this.$refs.form.reset()
            this.item.location = ''
            this.imgPreview = ''
            this.dialogItem = response.data.data
            const domain = window.location.protocol + '//' + window.location.host
            this.url = domain + '/items/' + response.data.data.id
            this.dialog = true
            setTimeout(() => {
              this.getQRCode()
            }, 100)
          })
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
        itemCategory: [
          v => !!v || this.$t('pleaseSelectCategory')
        ],
        itemType: [
          v => (this.item.category_id && this.item.category_id.slug === 'other' && !!v) || this.$t('pleaseSelectType')
        ],
        itemCost: [
          v => (this.item.category_id && this.item.category_id.slug === 'money' && !!v && v.match(/^[0-9]*\.?[0-9]*$/)) || this.$t('pleaseFillCost')
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

.main-dialog {
  background-color:#fff;
  padding:32px;
  .dialog-title {
    font-size: 24px;
    margin-bottom: 30px;
    color:#505050
  }
  .dialog-items {
    display:flex;
    flex-direction: column;
    list-style: none;
    gap:20px;
    .dialog-item-category {
      display:flex;
      align-items: center;
      gap:10px;
      font-size:14px;
      background: #FFF;
      padding:15px;
      border-radius: 8px;
      border:1px solid #E1E1E1;
      box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    }
    h3 {
      font-weight: 300;
      color:#363636
    }
    .dialog-item {
        display: flex;
        align-items: center;
        gap:15px;
        span {
          font-size:22px;
          font-weight:300;
          color:#777;
        }
    }
  }
}
</style>
