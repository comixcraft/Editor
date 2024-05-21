<script setup></script>

<template>
    <footer class="footer">
        <div class="first-row">
            <img class="logo" src="/public/comixcraftLogo.svg" />
            <div class="links">
                <a>Impressum</a>
                <a>Legal Information</a>
                <a>Comixplain</a>
            </div>
        </div>
        <hr class="line" />
        <p class="copyright">© comixcraft 2024. All rights reserved.</p>
    </footer>
</template>

<style lang="scss" scoped>
    .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: $primary-30;
        padding: $spacer-5 $spacer-7;

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

        .logo {
            width: 15rem;
        }

        .line {
            margin: $spacer-3 0;
        }

        .copyright {
            text-align: right;
        }
    }
</style>
