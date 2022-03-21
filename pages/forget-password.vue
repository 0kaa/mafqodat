<template>
  <div class="d-flex justify-space-between">
    <div class="auth-text d-flex flex-column flex-grow-1">
      <div class="d-flex justify-space-between">
        <div>
          <img src="/logo.png" alt="Logo">
        </div>
        <div>
          <img src="/Saudi_Vision.png" alt="Saudi Vision">
        </div>
      </div>
      <h1 class="text-center login-title font-weight-light">
        {{ $t('forgetPasswordTitle') }}
      </h1>
      <div class="login-form">
        <v-card max-width="700" class="mx-auto" color="transparent" elevation="0">
          <v-form
            v-if="step === 1"
            ref="forgetPassword"
            v-model="valid"
            lazy-validation
            autocomplete="off"
            @submit.prevent="forgetPassword()"
          >
            <v-card-text v-if="step == 1">
              <v-text-field
                v-model="email"
                :label="$t('forgetPasswordLabel')"
                autocomplete="off"
                :rules="rules()"
                class="mb-4"
                type="email"
                outlined
                required
                color="black"
              />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="px-14 py-6 font-weight-light login-btn"
              >
                {{ $t('resetPassword') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
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
      <div class="wave" />
    </div>
    <div class="bg-screen">
      <h2 class="welcome-title">
        {{ $t('welcomeTitle') }}
      </h2>
      <p class="welcome-description">
        {{ $t('welcomeDescription') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'auth',
  auth: 'guest',
  data: () => ({
    step: 1,
    valid: false,
    snackbar: false,
    showPassword: false,
    snackbarText: '',
    snackbarColor: 'red',
    email: ''
  }),
  mounted () {
    this.$refs.forgetPassword.resetValidation()
  },
  methods: {
    async forgetPassword () {
      try {
        if (this.$refs.forgetPassword.validate()) {
          const response = await this.$api.auth.forgetPassword({ email: this.email })
          this.snackbar = true
          this.snackbarText = response.data.message
          this.snackbarColor = 'green'
          this.$refs.forgetPassword.reset()
          this.step = 2
        }
      } catch (err) {
        this.snackbar = true
        this.snackbarText = err.response.data.message
        this.snackbarColor = 'red'
      }

      // await this.$auth.loginWith('local', { data: this.login })
    },
    rules () {
      return [
        v => !!v || this.$t('emailRequired'),
        v => /.+@.+\..+/.test(v) || this.$t('emailValid')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-screen {
  background: url('/auth-screen.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  width: 644px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding:0 23px;
  text-align: center;

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
.auth-text {
  padding:30px 80px;
  gap:60px;
  position: relative;
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
