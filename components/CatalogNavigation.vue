<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        category: { type: Array },
    });

    const emit = defineEmits(['categorySelected']);

    const selectCategory = (categoryName) => {
        emit('categorySelected', categoryName, true);
    };
</script>

<template>
    <div>
        <button v-for="(category, index) in props.category" :key="index" @click="selectCategory(category.name)">
            {{ category.name }}
        </button>
    </div>
</template>

<style scoped></style>
