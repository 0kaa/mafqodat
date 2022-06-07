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
    create (item) {
      return axios.post('items/create', item, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    update (id, item) {
      return axios.post(`items/update/${id}`, item)
    },
    delete (id) {
      return axios.post(`items/delete/${id}`)
    },
    deleteMedia (body) {
      return axios.post('delete_item_image', body)
    }

  }
}
