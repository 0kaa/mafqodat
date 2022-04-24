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
<style>
.log-item {
  padding: 22px 28px;
  border-bottom: 1px solid #e1e1e1;
  text-align: start;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: start;
}

.log-item:last-child {
  border: none;
}

.log-item.log-rtl {
  text-align: right;
}

.log-item .log-message {
  direction: ltr;
  color: #363636;
  font-size: 16px;
  font-weight: light;
}

.log-item .log-date {
  color: #7B7B7B;
  font-size: 14px;
  font-weight: light;
}
.log-item .log-image {
  border-radius: 4px;
  overflow: hidden;
}
</style>
