// plugins/api.js
import Auth from '~/api/auth'
import Categories from '~/api/categories'
import Countries from '~/api/countries'
import Cities from '~/api/cities'
import Employees from '~/api/employees'
import Stations from '~/api/stations'
import Items from '~/api/items'
import Reports from '~/api/reports'
import Storages from '~/api/storages'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    categories: Categories(context.$axios),
    countries: Countries(context.$axios),
    cities: Cities(context.$axios),
    employees: Employees(context.$axios),
    stations: Stations(context.$axios),
    items: Items(context.$axios),
    reports: Reports(context.$axios),
    storages: Storages(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
