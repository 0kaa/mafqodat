<template>
  <div>
    <h2 class="main-title mb-6">
      {{ $route.query.type == 'enquery' ? $t('reportItem') : $t('registerNewItem') }}
    </h2>
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
                  <v-select
                    v-model="item.storage_id"
                    :items="storages"
                    outlined
                    :disabled="!item.category_id"
                    :label="$t('chooseStorage')"
                    item-text="name"
                    item-value="id"
                    return-object
                    background-color="white"
                    :menu-props="{ bottom: true, offsetY: true }"
                  />
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
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    :value="item.station_id ? item.station_id.location : ''"
                    :label="$t('stationLocation')"
                    outlined
                    readonly
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col v-if="$route.query.type === 'enquery'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.informer_name"
                    :label="$t('informerName')"
                    outlined
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col v-if="$route.query.type === 'enquery'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.informer_phone"
                    :label="$t('mobile')"
                    outlined
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
      <v-col lg="3" cols="12" order="1" order-lg="2" class="pt-0 gap-4 d-flex flex-column flex-wrap">
        <div class="d-flex justify-center">
          <input
            ref="uploader"
            class="d-none"
            type="file"
            multiple
            accept="image/png,image/jpg,image/jpeg"
            @change="onFileChanged"
          >
          <v-btn
            color="primary"
            block
            outlined
            x-large
            class="text-capitalize"
            @click="onButtonClick"
          >
            {{ $t('uploadImage') }}
          </v-btn>
        </div>
        <div v-if="!item.images.length" class="user-profile-container">
          <v-img
            class="d-flex align-center text-center"
            src="/item_image.png"
            @click="onButtonClick"
          />
        </div>
        <div v-for="(image,index) in imgPreview" :key="index" class="user-profile-container">
          <v-img
            :src="image"
            class="user-profile"
            @click="onButtonClick"
          />
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
                  <img :src="dialogItem.category.image" class="dialog-image">
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
    imgPreview: '',
    valid: true,
    item: {
      category_id: '',
      station_id: '',
      storage_id: '',
      type: '',
      cost: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: '',
      details: '',
      images: '',
      report_type: '',
      informer_name: '',
      informer_phone: ''
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
    storages () {
      return [this.item.category_id ? this.item.category_id.storage : {}]
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
      if (e.target.files) {
        // convert to array
        const files = Array.from(e.target.files)
        const imgPreviews = []
        files.forEach((image) => {
          imgPreviews.push(URL.createObjectURL(image))
        })

        this.imgPreview = imgPreviews
        this.item.images = files
      } else {
        this.imgPreview = ''
      }
    },
    createItem () {
      this.loading = true
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        try {
          const formData = new FormData()
          this.item.report_type = this.$route.query.type === 'enquery' ? 'found' : 'lost'
          for (const key in this.item) {
            if (key === 'category_id' || key === 'station_id' || key === 'storage_id') {
              formData.append(key, this.item[key].id)
            } else if (key !== 'images') { formData.append(key, this.item[key]) }
          }

          // delete item images from formData
          if (this.item.images) {
            this.item.images.forEach((image) => {
              formData.append('images[]', image)
            })
          }
          this.$api.items.create(formData).then((response) => {
            this.snackbar = true
            this.snackbarText = response.data.message
            this.snackbarColor = 'green'
            this.loading = false
            this.$refs.form.reset()
            this.item.images = []
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
    border: 2px dashed #ABABAB;
    border-radius: 8px;
    overflow: hidden;
    padding: 10px;
    width: 100%;
    max-height: 250px;
    display: flex;
    justify-content: center;
}

.dialog-image {
  max-width:200px;
  object-fit: cover;
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
