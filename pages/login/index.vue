<template>
  <div class="d-flex justify-space-between align-center">
    <div class="text-center">
      <v-img src="/2030.png" class="secound-logo" />
    </div>
    <div class="auth-text d-flex flex-column flex-grow-1">
      <div class="d-flex justify-center w-100">
        <nuxt-link :to="localePath('/')">
          <v-img src="/landing_logo.png" class="logo" />
        </nuxt-link>
      </div>
      <h1 class="text-center login-title font-weight-light">
        {{ $t('login') }}
      </h1>
      <div class="login-form">
        <v-card max-width="600" class="mx-auto" color="transparent" elevation="0">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            autocomplete="off"
            @submit.prevent="signin()"
          >
            <v-card-text>
              <v-text-field
                v-model="login.email"
                :label="$t('email')"
                autocomplete="off"
                :rules="rules().email"
                class="mb-4"
                type="email"
                outlined
                required
                color="black"
              />

              <v-text-field
                v-model="login.password"
                :label="$t('password')"
                :type="showPassword ? 'text' : 'password'"
                outlined
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="rules().password"
                required
                color="black"
                @click:append="showPassword = !showPassword"
              />
              <nuxt-link :to="localePath('forget-password')" class="text-link">
                {{ $t('forgetPassword') }}
              </nuxt-link>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="px-14 py-6 font-weight-light login-btn"
                :loading="loading"
              >
                {{ $t('login') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="8000" color="red">
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
      <div class="wave" />
    </div>
    <div class="bg-screen" />
  </div>
</template>

<script>
export default {
  layout: 'auth',
  auth: false,
  data: () => ({
    valid: false,
    snackbar: false,
    showPassword: false,
    snackbarText: '',
    login: {
      email: '',
      password: ''
    },
    loading: false
  }),
  mounted () {
    this.$refs.form.resetValidation()
  },
  methods: {
    async signin () {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true
          await this.$auth.loginWith('local', { data: this.login })
          this.loading = false
          this.$router.push(this.localePath('/'))
          this.$refs.form.reset()
        }
      } catch (err) {
        this.snackbar = true
        this.snackbarText = err.response.data.message
        this.loading = false
      }
    },
    rules () {
      return {
        password: [
          v => !!v || this.$t('passwordRequired'),
          v => (v && v.length >= 6) || this.$t('passwordMinLength')
        ],
        email: [
          v => !!v || this.$t('emailRequired'),
          v => /.+@.+\..+/.test(v) || this.$t('emailValid')
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-screen {
  background: url('/auth-screen.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding:0 23px;
  text-align: center;
 @media(max-width:768px) {
    display:none;
  }
  .welcome-title {
    font-size:32px;
    font-weight:medium;
    color:#fff;
    margin-bottom:60px;
  }

  .welcome-description {
    color:#FFF;
    font-size:24px;
    font-weight:medium;
    line-height: 57px;
  }
}
.logo {
  width:100%;
  max-width:100px;
  object-fit: cover;
}
.secound-logo {
  width:100%;
  max-width:150px;
  object-fit: cover;
  position: absolute;
  top:20px;
  left:20px;
}
.auth-text {
    padding: 30px 80px;
    grid-gap: 60px;
    gap: 60px;
    position: absolute;
    background: white;
    overflow: hidden;
    border-radius: 10px;
    right: 0;
    left: 0;
    max-width: 600px;
    margin: auto;
  @media(max-width:768px) {
    padding:10px 15px;
    position: relative;
  }
  .login-title {
    font-size:32px;
    color:#505050;
  }
  .login-btn {
    font-size:16px;
    letter-spacing: 0;
    border-radius: 8px;
  }
    .wave {
      background: url('/wave.png') no-repeat;
      background-size: cover;
      width: 100%;
      height: 153px;
      position: absolute;
      right:0;
      bottom:0;
      z-index: -1;
      @media(max-width:992px) {
        display: none;
      }
    }
}

</style>
