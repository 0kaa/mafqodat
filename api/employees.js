// eslint-disable-next-line no-unused-vars
export default function employees (axios) {
  return {
    getAll (page = 1) {
      return axios.get(`employees?page=${page}`)
    },
    get (id) {
      return axios.get(`employees/show/${id}`)
    },
    create (employee) {
      return axios.post('employees/create', employee)
    },
    update (id, employee) {
      return axios.post(`employees/update/${id}`, employee)
    },
    delete (id) {
      return axios.post(`employees/delete/${id}`)
    }

  }
}
