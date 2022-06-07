<template>
  <div>
    <h2 class="main-title mb-6">
      {{ $t('items') }}
    </h2>
    <v-row>
      <v-col cols="12" md="4" />
      <v-col cols="12" md="4">
        <div class="text-center">
          <v-btn
            color="primary"
            outlined
            elevation="0"
            block
            :to="localePath('/items/new-choose')"
            class="px-14 py-8 font-weight-light login-btn"
          >
            {{ $t('addNewItem') }}
          </v-btn>
          <v-btn
            color="primary"
            outlined
            elevation="0"
            block
            class="px-14 py-8 mt-6 font-weight-light login-btn"
            :to="localePath('/items')"
            exact
          >
            {{ $t('enqueryItem') }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="4" />
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Choose'

}
</script>

<style lang="scss" scoped>
.login-btn {
  font-size:24px;
}
</style>
