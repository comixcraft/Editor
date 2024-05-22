<script setup></script>

<template>
    <footer class="footer">
        <div class="first-row">
            <NuxtLink :to="{ name: 'index', path: '/' }">
                <img class="logo" src="/public/comixcraftLogo.svg" />
            </NuxtLink>
            <div class="links">
                <a href="https://showcase.comixcraft.com/" target="_blank">About comixcraft</a>
                <a href="https://fhstp.github.io/comixplain/" target="_blank">About Comixplain</a>
                <Nuxtlink :to="{ name: 'impressum', path: '/impressum' }">
                    <a>Impressum</a>
                </Nuxtlink>
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

        .first-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: $spacer-4;
        }

        .links {
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: $spacer-3;
            cursor: pointer;
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

            .first-row {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .links {
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
