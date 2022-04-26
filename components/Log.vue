<template>
  <div v-if="log" class="log-item" :class="{'log-rtl': $i18n.locale === 'ar'}">
    <div class="log-image">
      <v-img
        v-if="$auth.user.image"
        :src="$auth.user.image"
        alt="user profile"
        class="user-profile"
        max-width="48"
        max-height="48"
      />
      <v-img
        v-else
        class="d-flex align-center text-center"
        max-width="48"
        max-height="48"
        src="/arab.png"
      />
    </div>
    <div>
      <div class="log-message">
        {{ log.message }}
      </div>
      <div class="log-date">
        {{ log.created_at }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Log',
  props: {
    log: {
      type: Object,
      required: true
    }
  }

}
</script>
