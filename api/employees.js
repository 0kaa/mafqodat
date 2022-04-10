// eslint-disable-next-line no-unused-vars
export default function employees (axios) {
  return {
    getAll () {
      return axios.get('employees')
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
