<script setup>

for (const [key, value] of Object.entries(sampleCatalog)) {
  console.log(`${value.name}`);
}



</script>


<template>

    <div class="container" id="catalog-container">

    </div>

</template>

<style scoped>

    .container {
        width: 300px;
        height: 700px;
        border: 1px solid #000;
        overflow-y: scroll;
    }

</style>