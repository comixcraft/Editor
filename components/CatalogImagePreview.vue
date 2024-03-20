<script setup>

    defineProps({
    altText: String,
    url: String,
    })


</script>

<template>

  <div class="card">
    <img :src="url" :alt="altText">
  </div>

</template>

<style scoped>
    .card {
        width: 180px;
        height: 180px;
        display: flex;
        justify-content: center;
    }
    .card > img {
        height: 100%;
        width: auto;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-select: none;
    }
</style>