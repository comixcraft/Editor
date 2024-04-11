<script setup>
    defineProps({
      altText: String,
      url: String,
    })
</script>

<template>

  <div class="card">
    <img :alt="altText"
         loading="lazy"
         :src="url" />
  </div>

</template>

<style scoped lang="scss">
    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      border: $border-width solid black;
    }

    .card > img {
      height: 100px;
      width: 100px;
      object-fit: contain;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-select: none;
    }
</style>