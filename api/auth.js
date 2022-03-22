// eslint-disable-next-line no-unused-vars
export default function axiosModule (axios) {
  return {
    forgetPassword (loginForm) {
      return axios.post('forget-password', loginForm)
    },
    verifyOtp (otp) {
      return axios.post('verify-otp', otp)
    },
    setNewPassword (passwordForm) {
      return axios.post('set-new-password', passwordForm)
    }
  }
}
