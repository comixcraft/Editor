import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
    ...pluginVue.configs['flat/essential'],
    {
        ignores: ['node-module/*'],
        plugins: {
            prettier: pluginPrettier,
            vue: pluginVue,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                useFetch: 'readonly',
                definePageMeta: 'readonly',
                createError: 'readonly',
                clearError: 'readonly',
                defineNuxtRouteMiddleware: 'readonly',
                navigateTo: 'readonly',
                ref: 'readonly',
            },
        },
        rules: {
            'prettier/prettier': 'error',
            'max-len': [
                'error',
                {
                    code: 120,
                    ignoreComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],
            'no-console': 'warn',
            'vue/no-console': 'warn',
            'vue/no-reserved-component-names': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/require-explicit-emits': 'error',
        },
    },
];
