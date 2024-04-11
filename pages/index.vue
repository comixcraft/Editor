<script setup>
    // Values should come from the template chosen before opening the editor
    const canvasWidth = ref(450);
    const canvasHeight = ref(750);
</script>

<template>
    <div class="container">
        <WrapperCanvas></WrapperCanvas>
        <CatalogContainer></CatalogContainer>
    </div>
    
    <button>
        <NuxtLink :to="{name:'export', path:'/export', query: {width: canvasWidth, height: canvasHeight}}">See Preview</NuxtLink>
    </button>

</template>

<style scoped>
    .container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>