// plugins/api.js
import Auth from '~/api/auth'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios)

  }

  // Inject $api
  inject('api', factories)
}
