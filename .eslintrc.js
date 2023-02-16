// Настройка eslint в VS code:
// Preferences -> Settings -> User -> Extensions -> ESLint -> Edit in settings.json
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        // Устанавливаем определенный стиль отступа (4 пробела) для обычного когда.
        indent: [2, 4],
        // Устанавливаем определенный стиль отступа (4 пробела) для JSX.
        'react/jsx-indent': [2, 4],
        // Устанавливаем определенный стиль отступа (4 пробела) для props в JSX.
        'react/jsx-indent-props': [2, { indentMode: 4, ignoreTernaryOperator: true }],
        // Указываем расширения в которых разрешен jsx
        'react/jsx-filename-extension': [2, { extensions: ['js', 'jsx', 'ts', 'tsx'] }],
        // Отключаем проверку импортов
        'import/no-unresolved': 'off',
        // Отключаем предпочтительное использование дефолтного экспорта
        'import/prefer-default-export': 'off',
        // Устанавливаем предупреждение для неиспользуемых переменных
        // По умолчанию это правило вернет ошибку
        'no-unused-vars': 'warn',
        // Отключаем проверку типа функции для функциональных компонентов, чтобы
        // можно было использовать стрелочные функции для именованных компонентов
        'react/function-component-definition': 'off',
        // Отключаем дефолтное значение props по умолчанию
        'react/require-default-props': 'off',
        // Отключаем обязательность импорта react по умолчанию при использовании JSX
        'react/react-in-jsx-scope': 'off',
        // Заменяем ошибку на предупреждение при использовании оператора расширения в props
        'react/jsx-props-no-spreading': 'warn',
        // ...
        'no-shadow': 'off',
        // Заменяем ошибку на предупреждение при использовании табов для отступов.
        // Для некоторых случаев использования табов для отступов отключаем проверку полностью
        'no-tabs': [1, { allowIndentationTabs: true }],
        // Отключаем запрет символов подчеркивания в идентификаторах (переменных и т.д.)
        'no-underscore-dangle': 'off',
        // Отключаем проверку расширений в импортах
        'import/extensions': 'off',
        // Чтобы не ругался на импорт 'webpack' в файле buildWebpackConfig.ts
        'import/no-extraneous-dependencies': 'off',
    },
    globals: {
        __IS_DEV__: true,
    },
    // settings: {
    //     react: {
    //         version: 'detect',
    //     },
    // },
};
