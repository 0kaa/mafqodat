// eslint-disable-next-line no-unused-vars
export default function storages (axios) {
  return {
    all () {
      return axios.get('storages?all=true')
    },
    getAll (page = 1) {
      return axios.get(`storages?page=${page}`)
    },
    get (id) {
      return axios.get(`storages/show/${id}`)
    },
    create (station) {
      return axios.post('storages/create', station)
    },
    update (id, station) {
      return axios.post(`storages/update/${id}`, station)
    },
    delete (id) {
      return axios.post(`storages/delete/${id}`)
    }

  }
}
