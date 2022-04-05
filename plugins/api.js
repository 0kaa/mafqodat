// plugins/api.js
import Auth from '~/api/auth'
import Categories from '~/api/categories'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    categories: Categories(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
