<template>
  <div class="filter-box">
    <div class="filter-box-header">
      <a href="#" @click.prevent="clearAll()">
        {{ $t('clearAll') }}
      </a>
      <div>
        {{ $t('filter') }}
      </div>
    </div>
    <div class="filter-box-content">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="filterItems"
      >
        <v-row>
          <v-col cols="12" class="py-0">
            <v-select
              v-model="filter.station_id"
              :items="stations"
              outlined
              :label="$t('stationName')"
              item-text="name"
              hide-details
              item-value="value"
              return-object
              background-color="white"
              :menu-props="{ bottom: true, offsetY: true }"
            />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-menu
              v-model="dateFrom"
              :close-on-content-click="false"
              :nudge-right="10"
              :nudge-top="20"
              offset-y
              min-width="auto"
              top
              transition="slide-y-transition"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.from"
                  :label="$t('from')"
                  outlined
                  color="black"
                  background-color="white"
                  readonly
                  v-bind="attrs"
                  :rules="rules().dateFrom"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="filter.from"
                no-title
                @input="dateFrom = false"
              />
            </v-menu>
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-menu
              v-model="dateTo"
              :close-on-content-click="false"
              :nudge-right="10"
              :nudge-top="20"
              offset-y
              min-width="auto"
              top
              transition="slide-y-transition"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.to"
                  :label="$t('to')"
                  outlined
                  color="black"
                  background-color="white"
                  readonly
                  :rules="rules().dateTo"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="filter.to"
                no-title
                @input="dateTo = false"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" class="py-0 text-center">
            <v-btn
              type="submit"
              color="primary"
              :disabled="!valid"
              elevation="1"
              class="px-8 py-6 font-weight-light"
            >
              {{ $t('save') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSearch',
  props: {
    filterData: {
      type: Object,
      required: true
    },
    stations: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    valid: true,
    dateFrom: false,
    dateTo: false,
    filter: {
      station_id: null,
      from: null,
      to: null
    }
  }),
  // watch from and reset to
  watch: {
    'filter.from': {
      handler () {
        if (this.filter.to <= this.filter.from) {
          this.filter.to = null
          this.$refs.form.resetValidation()
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.filterData) {
      this.filter = this.filterData
      this.$refs.form.resetValidation()
    }
  },
  methods: {
    clearAll () {
      this.filter = {
        station_id: null,
        from: null,
        to: null
      }
      this.$refs.form.resetValidation()
    },

    filterItems () {
      if (this.$refs.form.validate()) {
        this.$emit('filter', {
          station_id: this.filter.station_id || null,
          from: this.filter.from,
          to: this.filter.to
        })
      }
    },
    rules () {
      return {
        station_id: [

        ],
        dateFrom: [
          (v) => {
            if (this.filter.from && this.filter.to) {
              return this.filter.from <= this.filter.to ? true : this.$t('fromDateMustBeLessThanToDate')
            }
            return true
          }
        ],
        dateTo: [
          (v) => {
            return this.filter.from <= this.filter.to ? true : this.filter.from ? this.$t('toDateMustBeGreaterThanFromDate') : true
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
    background-color:#FFF;
    max-width: 366px;
    min-width: 366px;
    border-radius: 8px;
    width:100%;
    box-shadow: 0 6px 10px rgb(0,0,0,0.06);
    border:1px solid #E1E1E1;
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 9;
    .filter-box-header {
      padding:24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border:1px solid #E1E1E1;
    }
    .filter-box-content {
      padding:24px;
    }
}
</style>
