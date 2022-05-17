<template>
  <div v-if="locations && locations.length">
    <google-map
      :center="{
        lat: +locations[0].lat,
        lng: +locations[0].lng
      }"
      :zoom="8"
      style="width: 100%; height: 250px"
    >
      <google-maker
        v-for="(location,i) in locations"
        :key="i"
        :position="{
          lat: +location.lat,
          lng: +location.lng
        }"
        :draggable="false"
        :label="{
          text: (i + 1).toString()
        }"
      />
    </google-map>
  </div>
</template>

<script>
export default {
  props: {
    locations: {
      type: Array,
      required: true
    }
  }
}
</script>
