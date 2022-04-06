export const state = () => ({
  countries: [],
  cities: []
})

export const mutations = {
  setCounties (state, countries) {
    state.countries = countries
  },
  setCities (state, cities) {
    state.cities = cities
  }
}

// export const actions = {

// }
