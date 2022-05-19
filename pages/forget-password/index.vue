<template>
  <div class="d-flex justify-space-between">
    <div class="auth-text d-flex flex-column flex-grow-1">
      <div class="d-flex justify-space-between">
        <nuxt-link :to="localePath('/')">
          <v-img src="/logo.png" class="logo" />
        </nuxt-link>
        <div>
          <v-img src="/Saudi_Vision.png" class="secound-logo" />
        </div>
      </div>
      <h1 class="text-center login-title font-weight-light">
        <span v-if="step === 1">{{ $t('forgetPasswordTitle') }}</span>
        <span v-if="step === 2">{{ $t('otpTitle') }}</span>
        <span v-if="step === 3">{{ $t('setNewPassword') }}</span>
      </h1>
      <div class="login-form">
        <v-card v-if="step === 1" max-width="700" class="mx-auto" color="transparent" elevation="0">
          <v-form
            ref="forgetPassword"
            v-model="valid"
            lazy-validation
            autocomplete="off"
            @submit.prevent="forgetPassword()"
          >
            <v-card-text>
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
            <v-overlay absolute :value="loading">
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </v-overlay>
            <v-card-actions class="justify-center">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="font-weight-light login-btn"
              >
                {{ $t('resetPassword') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card
          v-if="step === 2"
          max-width="400"
          class="mx-auto relative"
          color="transparent"
          elevation="0"
        >
          <v-otp-input
            v-model="otp"
            length="4"
            :disabled="loading"
          />
          <v-overlay absolute :value="loading">
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </v-overlay>
          <v-card-actions class="justify-center flex-column items-center mt-5">
            <v-btn
              type="submit"
              color="primary"
              elevation="1"
              class="font-weight-light login-btn"
              @click="verifyOtp"
            >
              {{ $t('done') }}
            </v-btn>
            <button class="mt-6 text-link" @click="sendCodeAgain">
              {{ $t('sendCodeAgain') }}
            </button>
          </v-card-actions>
        </v-card>
        <v-card v-if="step === 3" max-width="700" class="mx-auto" color="transparent" elevation="0">
          <v-form
            ref="forgetPassword"
            v-model="valid"
            lazy-validation
            autocomplete="off"
            @submit.prevent="setNewPassword()"
          >
            <v-card-text>
              <v-text-field
                v-model="newPassword"
                :label="$t('setNewPassword')"
                :type="showNewPassword ? 'text' : 'password'"
                class="mb-2"
                outlined
                :append-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="passwordRules().newPassword"
                required
                color="black"
                @click:append="showNewPassword = !showNewPassword"
              />
              <v-text-field
                v-model="password_confirmation"
                :label="$t('confirmPassword')"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="mb-2"
                outlined
                :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="passwordRules().confirmPassword"
                required
                color="black"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
            </v-card-text>
            <v-overlay absolute :value="loading">
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </v-overlay>
            <v-card-actions class="justify-center">
              <v-btn
                type="submit"
                color="primary"
                :disabled="!valid"
                elevation="1"
                class="font-weight-light login-btn"
              >
                {{ $t('save') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="5000" :color="snackbarColor">
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
  name: 'ForgotPassword',
  layout: 'auth',
  auth: false,
  data: () => ({
    step: 1,
    loading: false,
    valid: false,
    passwordValid: false,
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'red',
    email: '',
    newPassword: '',
    showNewPassword: false,
    password_confirmation: '',
    showConfirmPassword: false,
    otp: ''
  }),
  mounted () {
    this.$refs.forgetPassword.resetValidation()
  },
  methods: {
    async forgetPassword () {
      this.loading = true
      try {
        if (this.$refs.forgetPassword.validate()) {
          const response = await this.$api.auth.forgetPassword({ email: this.email })
          this.snackbar = true
          this.loading = false
          this.snackbarText = response.data.message
          this.snackbarColor = 'green'
          this.step = 2
        }
      } catch (err) {
        this.snackbar = true
        this.loading = false
        this.snackbarText = err.response.data.message
        this.snackbarColor = 'red'
      }

      // await this.$auth.loginWith('local', { data: this.login })
    },
    async verifyOtp () {
      try {
        this.loading = true
        this.snackbar = false
        const response = await this.$api.auth.verifyOtp({ code: this.otp, email: this.email })
        this.$auth.strategy.token.set(response.data.data.token)
        this.loading = false
        this.snackbar = true
        this.snackbarText = response.data.message
        this.snackbarColor = 'green'
        this.step = 3
      } catch (error) {
        this.loading = false
        this.snackbar = true
        this.snackbarText = error.response.data.message
        this.snackbarColor = 'red'
      }
    },
    async sendCodeAgain () {
      try {
        this.loading = true
        this.snackbar = false
        const response = await this.$api.auth.forgetPassword({ email: this.email })
        this.loading = false
        this.snackbar = true
        this.snackbarText = response.data.message
        this.snackbarColor = 'green'
      } catch (error) {
        this.loading = false
        this.snackbar = true
        this.snackbarText = error.response.data.message
        this.snackbarColor = 'red'
      }
    },
    async setNewPassword () {
      try {
        this.loading = true
        this.snackbar = false
        const response = await this.$api.auth.setNewPassword({
          password: this.newPassword,
          password_confirmation: this.password_confirmation
        })
        this.loading = false
        this.snackbar = true
        this.snackbarText = response.data.message
        this.snackbarColor = 'green'
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.newPassword
          }
        })
        this.$router.push(this.localePath('home'))
      } catch (error) {
        this.loading = false
        this.snackbar = true
        this.snackbarText = error.response.data.message
        this.snackbarColor = 'red'
      }
    },
    rules () {
      return [
        v => !!v || this.$t('emailRequired'),
        v => /.+@.+\..+/.test(v) || this.$t('emailValid')
      ]
    },
    passwordRules () {
      return {
        newPassword: [
          v => !!v || this.$t('passwordRequired'),
          v => v.length >= 6 || this.$t('passwordMinLength')
        ],
        confirmPassword: [
          v => !!v || this.$t('passwordRequired'),
          v => v === this.newPassword || this.$t('passwordMatch')
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
  width: 644px;
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
  max-width:150px;
  object-fit: cover;
}
.secound-logo {
  width:100%;
  max-width:70px;
  object-fit: cover;
}
.auth-text {
  padding:30px 80px;
  gap:60px;
  position: relative;
   @media(max-width:768px) {
    padding:10px 15px;
  }
  .login-title {
    font-size:32px;
    color:#505050;
  }
  .login-btn {
    font-size:16px;
    letter-spacing: 0;
    border-radius: 8px;
    min-width: 240px;
    padding:24px;
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
