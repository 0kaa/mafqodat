// eslint-disable-next-line no-unused-vars
export default function reports (axios) {
  return {
    get () {
      return axios.get('reports')
    }
  }
}
