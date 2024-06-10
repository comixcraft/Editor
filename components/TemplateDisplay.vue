<script setup>
    const comicStore = useComicStore();

    const emit = defineEmits(['select-template']);

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
        selected: {
            type: Boolean,
            default: false,
        },
        function: {
            type: Function,
            default: null,
        },
    });

    function selectTemplate() {
        emit('select-template', {
            title: props.title,
            preview: props.preview,
            config: props.config,
        });
    }
</script>

<template>
    <div
        class="template"
        :class="{ 'template--selected': selected }"
        @click="selectTemplate"
        @dblclick="props.function({ ...props.config })"
        @touchstart="detectDoubleClick($event, props.function, { ...props.config })"
    >
        <p class="h5 template__title">{{ title }}</p>
        <img class="template__preview" :src="preview" :alt="title" draggable="false" />
    </div>
</template>

<style scoped lang="scss">
    .template {
        display: flex;
        flex-direction: column;
        padding: $spacer-3 $spacer-4;
        border: $border-width-lg solid $grey-100;
        border-radius: $border-radius;

        &--selected {
            cursor: pointer;
            border: $border-width-lg solid $primary;

            .template__title {
                color: $primary !important;
            }
        }

        &:hover {
            @include media-breakpoint-up(lg) {
                cursor: pointer;
                border: $border-width-lg solid $primary;
            }
        }
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
