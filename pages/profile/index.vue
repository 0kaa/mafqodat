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
    </div>
    <h2 v-if="user && Object.keys(user).length" class="main-title mb-6" v-text="$t('profile')" />
    <v-row v-if="user && Object.keys(user).length" justify="space-between">
      <v-col lg="9" cols="12" order="2" order-lg="1">
        <div class="inputs">
          <v-form ref="form">
            <v-card-text style="padding:0 !important">
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.name"
                    :label="$t('name')"
                    disabled
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.job_number"
                    :label="$t('jobNumber')"
                    disabled
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
                    v-model="user.phone"
                    :label="$t('phone')"
                    disabled
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.email"
                    :label="$t('email')"
                    outlined
                    disabled
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.working_period"
                    :label="$t('workingPeriod')"
                    disabled
                    type="text"
                    outlined
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
                <v-col lg="6" cols="12" class="py-0">
                  <v-text-field
                    v-model="user.date_of_hiring"
                    :label="$t('dateOfHiring')"
                    outlined
                    disabled
                    required
                    color="black"
                    background-color="white"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

  data: () => ({

    user: {},

    loading: false

  }),
  async fetch () {
    await this.$auth.fetchUser()
    this.user = { ...this.$auth.$state.user }
  },
  activated () {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
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
</style>
