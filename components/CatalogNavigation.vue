<script setup>
    import iconConfig from '../config/iconsConfig';

    const props = defineProps({
        categories: { type: Array },
    });

    const emit = defineEmits(['categorySelected']);

    const selectCategory = (category) => {
        emit('categorySelected', category, []);
    };
</script>

<template>
    <div class="navigation">
        <button v-for="(category, index) in props.categories" :key="index" @click="selectCategory(category)">
            <span class="icon"> {{ iconConfig.get(category.name) || 'default_icon' }} </span>
            {{ category.name }}
        </button>
    </div>
</template>

<style style lang="scss" scoped>
    .navigation {
        position: fixed;
        display: flex;
        flex-direction: column;
    }

    span {
        display: block;
    }
</style>
