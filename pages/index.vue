<template>
  <div>
    <h2 class="main-title mb-6">
      {{ $t('welcome') }} <span class="font-bold text--black">{{ $auth.user.name }}</span>
    </h2>
    <v-row>
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-btn
            color="primary"
            outlined
            elevation="0"
            :to="localePath('/items/choose')"
            block
            class="px-14 py-8 font-weight-light login-btn"
          >
            {{ $t('items') }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-btn
            color="primary"
            outlined
            elevation="0"
            :to="localePath('/reports')"
            block
            class="px-14 py-8 font-weight-light login-btn"
          >
            {{ $t('menu.reports') }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-btn
            color="primary"
            outlined
            elevation="0"
            :to="localePath('/logs')"
            block
            class="px-14 py-8 font-weight-light login-btn"
          >
            {{ $t('logs') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Home'

}
</script>

<style lang="scss" scoped>
.login-btn {
  font-size:24px;
}
</style>
