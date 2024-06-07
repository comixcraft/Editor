// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
    css: ['@/assets/scss/styles.scss'],
    devtools: { enabled: true },
    modules: ['@pinia/nuxt', 'nuxt-swiper'],
    buildModules: ['@nuxtjs/google-analytics'],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/variables.scss" as *;',
                },
            },
        },
        resolve: {
            alias: {
                '~bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url)),
            },
        },
    },
    googleAnalytics: {
        id: 'G-M3GN7L92TF',
    },
});
