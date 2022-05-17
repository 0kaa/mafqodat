// eslint-disable-next-line no-unused-vars
export default function items (axios) {
  return {
    all () {
      return axios.get('items?all=true')
    },
    getAll (page = 1) {
      return axios.get(`items?page=${page}`)
    },
    latest () {
      return axios.get('home/items/latest')
    },
    locations () {
      return axios.get('home/locations')
    },
    get (id) {
      return axios.get(`items/show/${id}`)
    },
    create (station) {
      return axios.post('items/create', station)
    },
    update (id, station) {
      return axios.post(`items/update/${id}`, station)
    },
    delete (id) {
      return axios.post(`items/delete/${id}`)
    }

  }
}
