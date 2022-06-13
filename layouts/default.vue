<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      :right="availableLocales[0].code !== 'ar'"
      app
      mobile-breakpoint="991"
    >
      <div class="nav-image">
        <img src="/dashboard_layout_image.png">
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
          <v-btn
            v-if="item.new"
            color="primary"
            outlined
            icon
            small
            class="rounded-lg"
            @click.prevent="() => { $router.push(item.toNew)}"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-spacer />
      <div class="px-5">
        <v-btn
          v-if="$auth.loggedIn && $auth.user.permissions.includes('create_item')"
          color="primary"
          class="rounded-lg"
          :to="localePath('/items/new')"
          block
        >
          {{ $t('addNewItem') }}
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar fixed app color="white" class="justify-space-between">
      <img src="/logo.png" class="logo">
      <v-spacer />
      <img src="/Saudi_Vision.png" class="saudi-vision">
      <v-spacer />
      <div class="d-flex" style="gap:10px">
        <v-btn
          v-for="(locale,i) in availableLocales"
          :key="i"
          color="primary"
          fab
          small
          outlined
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.code }}
        </v-btn>

        <v-menu
          rounded
          offset-y
          min-width="200"
          bottom
          transition="slide-y-transition"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              fab
              small
              v-bind="attrs"
              class="overflow-hidden"
              outlined
              color="primary"
              v-on="on"
            >
              <v-img
                v-if="$auth.user.image"
                :src="$auth.user.image"
                alt="user profile"
                class="user-profile-default"
              />
              <v-icon
                v-else
                size="30"
              >
                mdi-account-tie
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item link :to="localePath('/profile')">
              <v-list-item-title v-text="$t('profile')" />
              <svg
                id="_392531_account_friend_human_man_member_icon"
                data-name="392531_account_friend_human_man_member_icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18.581"
                height="17.917"
                viewBox="0 0 18.581 17.917"
              >
                <path id="Path_16" data-name="Path 16" d="M15.237,11.847a5.32,5.32,0,1,0-1.137.958,7.949,7.949,0,0,1,5.127,6.785H3.355a7.967,7.967,0,0,1,2.706-5.343.664.664,0,0,0-.872-1A9.291,9.291,0,0,0,2,20.254a.663.663,0,0,0,.664.664H19.917a.663.663,0,0,0,.664-.664A9.274,9.274,0,0,0,15.237,11.847ZM7.309,8.309a3.982,3.982,0,1,1,3.982,3.982A3.986,3.986,0,0,1,7.309,8.309Z" transform="translate(-2 -3)" fill="#f6931e" />
              </svg>
            </v-list-item>
            <v-list-item link @click.prevent="logout()">
              <v-list-item-title v-text="$t('logout')" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20.664" height="17.387" viewBox="0 0 20.664 17.387">
                <g id="log-out-outline" transform="translate(0.5 0.5)">
                  <path
                    id="Path_19"
                    data-name="Path 19"
                    d="M4.5,19.04v2.049a2.049,2.049,0,0,0,2.049,2.049h8.193a2.049,2.049,0,0,0,2.049-2.049V8.8A2.049,2.049,0,0,0,14.742,6.75H6.958A2.439,2.439,0,0,0,4.5,8.8v2.049"
                    transform="translate(2.873 -6.75)"
                    fill="none"
                    stroke="#f6931e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  />
                  <path
                    id="Path_20"
                    data-name="Path 20"
                    d="M29.972,20.568l-4.1-4.1,4.1-4.1"
                    transform="translate(-25.875 -8.278)"
                    fill="none"
                    stroke="#f6931e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  />
                  <path
                    id="Path_21"
                    data-name="Path 21"
                    d="M25.484,18H12.375"
                    transform="translate(-11.556 -9.807)"
                    fill="none"
                    stroke="#f6931e"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-app-bar-nav-icon class="d-lg-none" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main style="background-color:#FBFCFF">
      <v-container fluid class="pt-8 px-8">
        <Nuxt
          keep-alive
          :keep-alive-props="{ exclude: ['Reports','EditItem','ShowItem','Logs'] }"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: true
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    items () {
      return [
        {
          icon: 'mdi-home',
          title: this.$t('menu.home'),
          to: this.localePath('/'),
          new: false
        },
        {
          icon: 'mdi-chart-bar',
          title: this.$t('menu.reports'),
          to: this.localePath('/reports'),
          new: false
        },
        // {
        //   icon: 'mdi-account-multiple-plus',
        //   title: this.$t('menu.employees'),
        //   to: this.localePath('/employees'),
        //   new: this.$auth.loggedIn && !!this.$auth.user.permissions.includes('create_employee'),
        //   toNew: this.localePath('/employees/new')
        // },
        // {
        //   icon: 'mdi-bus-marker',
        //   title: this.$t('menu.stations'),
        //   to: this.localePath('/stations'),
        //   new: this.$auth.loggedIn && !!this.$auth.user.permissions.includes('create_station'),
        //   toNew: this.localePath('/stations/new')
        // },
        {
          icon: 'mdi-lock-question',
          title: this.$t('menu.items'),
          to: this.localePath('/items'),
          new: false
        },
        {
          icon: 'mdi-note-text',
          title: this.$t('logs'),
          to: this.localePath('/logs'),
          new: false
        },
        {
          icon: 'mdi-cog',
          title: this.$t('menu.settings'),
          to: this.localePath('/profile'),
          new: false
        }
      ]
    }
  },
  created () {
    this.$vuetify.rtl = this.$i18n.locale === 'ar'
  },
  mounted () {
    setTimeout(() => {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false
      }
    }, 0)
  },
  methods: {
    async logout () {
      await this.$auth.logout()
      this.$router.push(this.localePath('login'))
    }
  }
}
</script>

<style lang="scss">
.nav-image {
  padding:40px 16px 20px;
  img {
    width: 100%;
    border-radius: 8px;
    height: 180px;
    object-fit: cover;
  }
}
.logo {
  width:100%;
  max-width:200px;
  object-fit: cover;
  @media(max-width:768px) {
    max-width:150px;
  }
}
.saudi-vision {
  width:100%;
  max-width:65px;
  object-fit: cover;
    @media(max-width:768px) {
    max-width:50px;
  }
}
.user-profile-default {
  max-width: 50px;
  object-fit: cover;
}

.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  padding-bottom:40px;
  @media(max-width:992px) {
    padding-bottom:80px;
  }
}

</style>
