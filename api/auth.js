// eslint-disable-next-line no-unused-vars
export default function axiosModule (axios) {
  return {
    forgetPassword (loginForm) {
      return axios.post('forget-password', loginForm)
    }
  }
}
