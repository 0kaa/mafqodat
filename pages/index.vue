<template>
  <div>
    <input v-model="name" placeholder="name">
    <input v-model="id" placeholder="id">
    <div v-for="(order,i) in orderItems" :key="i" class="d-flex gap-10">
      <div class="me-2">
        {{ order.name }}
      </div>
      <div>
        {{ order.id }}
      </div>
    </div>
    <v-btn color="success" @click="pushInsideOrders">
      Add order
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    id: '',
    name: '',
    orderItems: []
  }),
  // middleware: 'auth',
  mounted () {
    this.$api.categories.getAll()
  },
  methods: {
    pushInsideOrders () {
      const order = {
        piece_name: this.name,
        id: this.id
      }
      order.attributes = [1, 2]
      this.orderItems.push(order)

      this.name = ''
      this.id = ''
      this.step = 1
    }
  }
}
</script>
