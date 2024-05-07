<script setup>
    const props = defineProps({
        imgSrc: String,
        title: String,
        body: String,
        buttons: Object,
    });
</script>

<template>
    <div>
        <div class="container">
            <img :src="props.imgSrc" alt="" class="pop-up__image" />
            <p class="title h1">{{ props.title }}</p>
            <p class="body">{{ props.body }}</p>
            <div class="btn-container">
                <button class="option-btn" v-for="(button, index) in props.buttons" :key="index">{{ button }}</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        padding: $spacer-3;
        display: flex;
        gap: $spacer-5;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .pop-up__image {
        width: 60%;
        height: auto;
    }

    .title {
        color: $primary;
        text-align: center;
        margin: 0 0 -1rem 0;
    }

    .body {
        margin: 0;
    }

    .btn-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: $spacer-3;
    }

    .option-btn {
        text-align: center;
        z-index: 1;
        color: $secondary-100;
        background-color: $white-100;
        padding: $spacer-3 $spacer-5;
        border-radius: $border-radius-lg;
        border: $border-width solid $secondary-100;
        width: calc(100% - $spacer-6);
    }

    .option-btn:first-child {
        background-color: $secondary-100;
        color: $grey-0;
        border: none;
    }
</style>
