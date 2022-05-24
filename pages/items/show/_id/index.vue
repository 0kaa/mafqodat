<template>
  <div>
    <h2 class="main-title mb-6" v-text="$t('itemPreview')" />
    <v-row justify="space-between" class="row-gap">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form ref="form">
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="item.category"
                    readonly
                    :items="categories"
                    outlined
                    :label="$t('itemType')"
                    item-text="name"
                    item-value="value"
                    return-object
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
                <v-col v-if="item.category && item.category.slug === 'other'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.type"
                    readonly
                    :label="$t('writeItemType')"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col v-if="item.category && item.category.slug === 'money'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.cost"
                    readonly
                    :label="$t('lostItemCost')"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-select
                    v-model="item.station"
                    readonly
                    :items="stations"
                    outlined
                    :label="$t('chooseStation')"
                    item-text="name"
                    item-value="value"
                    return-object
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.date"
                    :label="$t('lostDate')"
                    readonly
                    outlined
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.time"
                    :label="$t('lostTime')"
                    outlined
                    readonly
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.storage"
                    readonly
                    :label="$t('storagePlace')"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-textarea
                    v-model="item.details"
                    readonly
                    rows="2"
                    auto-grow
                    :label="$t('details')"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-checkbox
                v-model="item.is_delivered"
                readonly
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
                      readonly
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.surname"
                      :label="$t('familyName')"
                      outlined
                      readonly
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>

                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.email"
                      :label="$t('email')"
                      outlined
                      readonly
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>

                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.address"
                      :label="$t('address')"
                      outlined
                      readonly
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.phone"
                      :label="$t('phone')"
                      type="text"
                      name="phone-number"
                      outlined
                      readonly
                      required
                      color="black"
                      background-color="white"
                    />
                  </v-col>
                  <v-col lg="6" cols="12" class="py-0">
                    <v-text-field
                      v-model="item.mobile"
                      :label="$t('mobile')"
                      type="text"
                      name="phone-number"
                      outlined
                      readonly
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

            <v-card-actions v-if="$auth.loggedIn && $auth.user.permissions.includes('update_item')" class="justify-start">
              <v-btn
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="px-14 py-6 font-weight-light login-btn"
                :loading="loading"
                :to="localePath(`/items/edit/${item.id}`)"
              >
                {{ $t('editItem') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </div>
      </v-col>
      <v-col lg="3" cols="12" order="1" order-lg="2" class="py-0">
        <div class="align-center d-flex flex-column justify-center mb-8 user-profile-container">
          <div ref="print">
            <canvas id="canvas" ref="canvas" class="canvas" />
          </div>

          <v-btn
            class="v-btn--active"
            text
            @click="print()"
          >
            {{ $t('print') }}
          </v-btn>
        </div>
        <div class="user-profile-container">
          <v-img
            v-if="!item.image && !imgPreview"
            class="d-flex align-center text-center"
            src="/item_image.png"
          />
          <v-img
            v-if="item.image && !imgPreview"
            :src="item.image"
            class="user-profile"
          />
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
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default {
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
    QRCodeModuleLoaded: false,
    url: '',
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
  mounted () {
    const domain = window.location.protocol + '//' + window.location.host
    this.url = domain + '/items/show/' + this.item.id
    setTimeout(() => {
      this.getQRCode()
    }, 100)
  },
  methods: {
    print () {
      const data = this.$refs.print
      html2canvas(data, {
        useCORS: true,
        allowTaint: true
      }).then((canvas) => {
        const myImage = canvas.toDataURL('image/jpeg,1.0')
        const imgWidth = 200
        const imgHeight = 200
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF('p', 'mm', 'a4')
        pdf.addImage(myImage, 'png', 2, 2, imgWidth, imgHeight)

        pdf.save('qrcode.pdf')
      })
    },
    async getQRCode () {
      const options = {
        width: 150,
        height: 150,
        errorCorrectionLevel: 'L',
        type: 'image/png',
        rendererOpts: {
          quality: 1
        }
      }
      /* global QRCode */
      await QRCode.toCanvas(this.$refs.canvas, this.url, options)
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
