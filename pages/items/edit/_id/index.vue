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
                    v-model="item.storage"
                    :items="storages"
                    outlined
                    :disabled="!item.category"
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
                    :value="item.station ? item.station.location : ''"
                    :label="$t('stationLocation')"
                    outlined
                    readonly
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col v-if="item.report_type === 'found'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.informer_name"
                    :rules="rules().informer_name"
                    :label="$t('informerName')"
                    outlined
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col v-if="item.report_type === 'found'" lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="item.informer_phone"
                    :rules="rules().informer_phone"
                    :label="$t('mobile')"
                    outlined
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="12" cols="12" class="py-0">
                  <v-checkbox
                    v-model="item.is_delivered"
                    class="mt-0"
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
                          v-model="item.full_name"
                          :label="$t('recieveName')"
                          outlined
                          required
                          :rules="rules().full_name"
                          color="black"
                          background-color="white"
                        />
                      </v-col>
                      <v-col lg="6" cols="12" class="py-0">
                        <v-text-field
                          v-model="item.phone"
                          :label="$t('recievePhone')"
                          :rules="rules().phone"
                          type="text"
                          name="phone-number"
                          outlined
                          required
                          color="black"
                          background-color="white"
                        />
                      </v-col>
                    </v-row>
                  </div>
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
        <div v-if="!item.media.length && !imgPreview" class="user-profile-container">
          <v-img
            class="d-flex align-center text-center"
            src="/item_image.png"
            @click="onButtonClick"
          />
        </div>
        <div v-if="item.media" class="w-100 d-flex flex-column gap-4 flex-wrap">
          <div v-for="(image,index) in item.media" :key="index" class="user-profile-container">
            <v-img
              :src="image.image"
              class="user-profile"
            />
            <div class="img-overlay" @click="deleteMedia(image)">
              <v-btn color="error" elevation="0">
                {{ $t('delete_image') }}
              </v-btn>
            </div>
          </div>
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
  name: 'EditItem',
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
      return {
        categories: categories.data.data,
        stations: stations.data.data,
        item: item.data.data
      }
    } catch (error) {
      return redirect('/items')
    }
  },
  data: () => ({
    menu: false,
    modalDate: false,
    modalTime: false,
    imgPreview: '',
    valid: true,
    item: {
      category: '',
      station: '',
      date: '',
      time: '',
      details: '',
      storage: '',
      images: '',
      informer_name: '',
      informer_phone: '',
      report_type: '',
      full_name: '',
      is_delivered: 0,
      user: ''
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
    storages () {
      return [this.item.category ? this.item.category.storage : {}]
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
    deleteMedia (media) {
      this.$api.items.deleteMedia({
        image_id: media.id
      }).then(() => {
        this.item.media = this.item.media.filter(image => image.id !== media.id)
        this.snackbar = true
        this.snackbarText = this.$t('image_deleted')
        this.snackbarColor = 'green'
      })
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
    async updateItem () {
      this.loading = true
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        try {
          const formData = new FormData()
          for (const key in this.item) {
            if (key === 'category' || key === 'station' || key === 'storage') {
              formData.append(key + '_id', this.item[key].id)
            } else if (key !== 'images') { formData.append(key, this.item[key]) }
          }
          if (this.item.images) {
            this.item.images.forEach((image) => {
              formData.append('images[]', image)
            })
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
        ],
        informer_name: [
          v => !!v || this.$t('pleaseFillInformerName')
        ],
        informer_phone: [
          v => !!v || this.$t('pleaseFillInformerPhone')
        ],
        full_name: [
          v => !!v || this.$t('pleaseFillFullName')
        ],
        phone: [
          v => !!v || this.$t('pleaseFillPhone')
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
    position: relative;
    &:hover {
      .img-overlay {
        opacity:1;
      }
    }
}
.holder-title {
  font-size: 24px;
  font-weight: 300;
  margin-bottom:44px;
  color:#505050
}
.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  padding:10px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity:0;
  transition: all .3s ease-in-out;
}

</style>
