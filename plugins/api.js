// plugins/api.js
import Auth from '~/api/auth'
import Categories from '~/api/categories'
import Countries from '~/api/countries'
import Cities from '~/api/cities'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    categories: Categories(context.$axios),
    countries: Countries(context.$axios),
    cities: Cities(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
