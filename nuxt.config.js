import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Lostzom',
    title: 'Lostzom',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/api.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/google-maps.js', client: true },
    { src: '~/plugins/vue-json-excel.js' },
    { src: '@/plugins/vue-html2pdf', mode: 'client' }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    '@nuxtjs/i18n',
    '@nuxtjs/universal-storage'
  ],

  i18n: {
    locales: [
      {
        name: 'Arabic',
        code: 'ar',
        iso: 'ar',
        file: 'ar.js'
      },
      {
        name: 'Engllish',
        code: 'en',
        iso: 'en-US',
        file: 'en.js'
      }
    ],
    defaultLocale: 'ar',
    langDir: 'locales/'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://admin.lostzom.com/api/'
    // baseURL: 'http://127.0.0.1:8000/api/'
  },
  auth: {

    strategies: {
      local: {
        token: {
          property: 'data.token',
          required: true,
          // global: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 365
        },
        user: {
          property: 'data.user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          register: { url: '/signup', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/profile', method: 'get' }
        }
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets: {
      font: false,
      icons: 'mdi'
    },
    rtl: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#F6931E',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
