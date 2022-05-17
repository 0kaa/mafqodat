// eslint-disable-next-line no-unused-vars
export default function axiosModule (axios) {
  return {
    all () {
      return axios.get('categories?all=true')
    },
    items (id) {
      return axios.get(`category/${id}/items`)
    },
    getAll () {
      return axios.get('categories')
    },
    create (category) {
      return axios.post('categories/create', category)
    },
    update (id, category) {
      return axios.post(`categories/update/${id}`, category)
    },
    delete (id) {
      return axios.post(`categories/delete/${id}`)
    }
  }
}
