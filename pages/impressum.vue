<script setup></script>

<template>
    <div class="index">
        <div class="top-nav">
            <img src="/public/TextwithBg.svg" alt="" class="top-nav__logo" />
        </div>

        <FooterComponent />
    </div>
</template>

<style scoped lang="scss">
    .top-nav {
        justify-content: flex-start;
    }

    .top-nav__logo {
        display: flex;
        flex-direction: row;
        margin-left: $spacer-4;
        justify-content: center;
        width: 10rem;
    }

    @include media-breakpoint-up(lg) {
        .top-nav {
            justify-content: flex-start;
            padding: $spacer-4 $spacer-3;
        }
        .top-nav__logo {
            justify-content: flex-start;
        }
    }
</style>
