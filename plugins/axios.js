export default function ({ $axios, $storage }, inject) {
  // Create a custom axios instance

  $axios.setHeader('Content-Type', 'application/json')

  $axios.setHeader('Accept-Language', $storage.getUniversal('i18n_redirected'))

  // Overrides `Authorization` header with new value
  $axios.setHeader('Cache-Control', 'no-cache')

  // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
  $axios.setHeader('Connection', 'keep-alive')

  // Removes default Content-Type header from `post` scope
  $axios.setHeader('X-Accel-Buffering', 'no')

  // Set baseURL to something different
  $axios.setBaseURL('https://admin.lostzom.com/api/')
  // $axios.setBaseURL('http://127.0.0.1:8000/api/')
}
