// eslint-disable-next-line no-unused-vars
export default function axiosModule (axios) {
  return {
    getAll () {
      return axios.get('cities')
    },
    create (category) {
      return axios.post('cities/create', category)
    },
    update (id, category) {
      return axios.post(`cities/update/${id}`, category)
    },
    delete (id) {
      return axios.post(`cities/delete/${id}`)
    }
  }
}
