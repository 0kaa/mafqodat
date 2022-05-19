<template>
  <nuxt-link :to="localePath(`/category/${category.id}`)" class="category-item">
    <div class="category-item__image">
      <v-img :src="category.image" alt="category" class="category-image" />
    </div>
    <div class="category-item__content">
      <h3 class="category-item__title">
        {{ category.name }}
      </h3>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.category-item {
  user-select: none;
    display: flex;
    flex-direction: column;
    min-width:168px;
    width:100%;
    border-radius: 8px;
    border:1px solid #E1E1E1;
    gap:30px;
    box-shadow: 0 6px 10px rgb(0,0,0,0.06);
    background-color:#fff;
    padding:22px 16px;
    text-decoration: none;
    &.nuxt-link-active {
      background-color: rgb(255,231,203,100%);
    }
    .category-item__image .category-image {
      max-width: 50px;
    }
    .category-item__title {
        color:#505050;
        font-weight:300;
        margin:0;
        font-size:18px;

    }
}
</style>
