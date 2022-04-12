// eslint-disable-next-line no-unused-vars
export default function stations (axios) {
  return {
    getAll (page = 1) {
      return axios.get(`stations?page=${page}`)
    },
    create (station) {
      return axios.post('stations/create', station)
    },
    update (id, station) {
      return axios.post(`stations/update/${id}`, station)
    },
    delete (id) {
      return axios.post(`stations/delete/${id}`)
    }

  }
}
