// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
    css: ['@/assets/scss/styles.scss'],
    devtools: { enabled: true },
    modules: ['@pinia/nuxt', 'nuxt-swiper', 'nuxt-gtag'],
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
    app: {
        head: {
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'manifest', href: '/site.webmanifest' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
            ],
            meta: [
                { name: 'msapplication-TileColor', content: '#da532c' },
                { name: 'theme-color', content: '#ffffff' },
            ],
        },
    },
    gtag: {
        id: 'G-M3GN7L92TF', // Replace with your Google Analytics Measurement ID
    },
});
