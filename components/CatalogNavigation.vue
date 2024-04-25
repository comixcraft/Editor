<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        categories: { type: Array },
    });
    let selectedCategoryAssets = ref([]);

    const emit = defineEmits(['categorySelected']);

    const selectCategory = (category) => {
        console.log('catName from emit:', category.name);
        console.log('assets form emit:', category.assets);
        emit('categorySelected', category, []);
    };
</script>

<template>
    <div class="navigation">
        <button v-for="(category, index) in props.categories" :key="index" @click="selectCategory(category)">
            {{ category.name }}
        </button>
    </div>
</template>
