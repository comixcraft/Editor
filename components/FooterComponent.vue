<script setup></script>

<template>
    <footer class="footer">
        <div class="topRow">
            <NuxtLink to="/">
                <img class="logo" src="/public/comixcraftLogo.svg" />
            </NuxtLink>
            <div class="linkContainer">
                <NuxtLink class="linkText" to="/impressum">Impressum</NuxtLink>
                <NuxtLink class="linkText" to="https://showcase.comixcraft.com/" target="_blank"
                    >About comixcraft</NuxtLink
                >
                <NuxtLink class="linkText" to="https://fhstp.github.io/comixplain/" target="_blank"
                    >About Comixplain</NuxtLink
                >
            </div>
        </div>
        <hr class="line" />
        <div class="copyright">© comixcraft 2024. All rights reserved.</div>
    </footer>
</template>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        background-color: $primary-30;
        padding: $spacer-4;

        .topRow {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: $spacer-4;
        }

        .linkContainer {
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: $spacer-3;
            cursor: pointer;

            .linkText {
                text-decoration: none;
                color: $black-100;
            }
            .linkText:hover {
                color: $primary-100;
                text-decoration: underline;
            }
        }

        .logo {
            width: 10rem;
            cursor: pointer;
        }

        .line {
            margin: $spacer-4 0;
            color: $grey-70;
        }

        .copyright {
            text-align: center;
        }
    }

    @include media-breakpoint-up(lg) {
        .footer {
            padding: $spacer-5 $spacer-7;

            .logo {
                width: 14rem;
            }

            .topRow {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .linkContainer {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: $spacer-3;
                text-align: right;
            }

            .line {
                margin: $spacer-4 0 $spacer-5;
            }

            .copyright {
                text-align: right;
            }
        }
    }
</style>
