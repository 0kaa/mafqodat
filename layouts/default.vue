<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      app
    >
      <div class="nav-image">
        <img src="/nav-image.png">
      </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="white" class="justify-content-between">
      <img src="/logo.png" class="logo">
      <v-spacer />
      <img src="/Saudi_Vision.png" class="saudi-vision">
      <v-spacer />
      <div class="d-flex" style="gap:10px">
        <v-btn
          v-for="(locale,i) in availableLocales"
          :key="i"
          color="primary"
          icon
          outlined
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.code }}
        </v-btn>
        <v-btn
          v-for="(locale,i) in availableLocales"
          :key="i"
          color="primary"
          icon
          outlined
          :to="switchLocalePath(locale.code)"
        />
      </div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

      menus: [...Array(4)].map((_, i) => `Item ${i}`),
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-image {
  padding:40px 16px 20px;
  img {
    width:100%;
  }
}
.logo {
  width:100%;
  max-width:150px;
  object-fit: cover;
}
.saudi-vision {
  width:100%;
  max-width:65px;
  object-fit: cover;
}
</style>
