// eslint-disable-next-line no-unused-vars
export default function axiosModule (axios) {
  return {
    getAll () {
      return axios.get('countries')
    },
    create (category) {
      return axios.post('countries/create', category)
    },
    update (id, category) {
      return axios.post(`countries/update/${id}`, category)
    },
    delete (id) {
      return axios.post(`countries/delete/${id}`)
    }
  }
}
