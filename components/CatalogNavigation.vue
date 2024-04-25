<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        categories: { type: Array },
    });

    const emit = defineEmits(['categorySelected']);

    const selectCategory = (category) => {
        emit('categorySelected', category);
    };
</script>

<template>
    <div class="navigation">
        <button v-for="(category, index) in props.categories" :key="index" @click="selectCategory(category)">
            {{ category.name }}
        </button>
    </div>
</template>
