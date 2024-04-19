<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
        preview: {
            type: String,
            default: '',
        },
        config: {
            type: Object,
            default: () => ({}),
        },
    });
</script>

<template>
    <div class="template">
        <p class="h5 template__title">{{ title }}</p>
        <img class="template__preview" :src="preview" :alt="title" />
    </div>
</template>

<style scoped lang="scss">
    .template {
        display: flex;
        flex-direction: column;
        padding: $spacer-3 $spacer-4;
        border: $border-width-lg solid $grey-100;
        border-radius: $border-radius;

        &__preview {
            height: 20vh;
            max-height: 250px;
            min-height: 100px;
            width: auto;
        }

        &__title {
            color: $medium-grey-100;
            margin-bottom: $spacer-1;
        }
    }
</style>
