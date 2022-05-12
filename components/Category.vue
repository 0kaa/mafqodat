<template>
  <div class="category-item">
    <div class="category-item__image">
      <img :src="category.image" alt="category">
    </div>
    <div class="category-item__content">
      <h3 class="category-item__title">
        {{ category.name }}
      </h3>
    </div>
  </div>
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
    border-radius: 8px;
    border:1px solid #E1E1E1;
    gap:30px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.10);
    background-color:#fff;
    padding:22px 16px;
    text-decoration: none;
    .category-item__title {
        color:#505050;
        font-weight:300;
        margin:0;
        font-size:18px;

    }
}
</style>
