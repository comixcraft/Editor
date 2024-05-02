import { fileURLToPath } from 'node:url';
import { defineVitestConfig } from '@nuxt/test-utils/config';
import { resolve } from 'node:path';

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        environmentOptions: {
            nuxt: {
                rootDir: fileURLToPath(new URL('./', import.meta.url)),
                overrides: {
                    alias: {
                        '~': resolve(fileURLToPath(new URL('./', import.meta.url))),
                    },
                },
            },
        },
    },
});
