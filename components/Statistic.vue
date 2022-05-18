<template>
  <div class="statistics-item">
    <h3 class="statistics-item__title">
      {{ title }}
    </h3>
    <div class="statistics-item__content">
      <h4 class="statistics-item__number">
        {{ count }}
      </h4>
      <slot name="icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }
}
</script>
