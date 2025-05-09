import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs']
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        rules: {
            'no-unsafe-assignment': 'off',
            'no-unused-vars': 'off',
            'prettier/prettier': 'warn',
            '@typescript-eslint/no-unsafe-call': 'off'
        }
    }
)
