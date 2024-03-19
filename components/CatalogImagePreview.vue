<script setup>
    import { ref, onMounted } from 'vue'

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
    }
</style>