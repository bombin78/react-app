import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
    // Например, в дев режиме сначала выполнится 'sass-loader', затем
    // 'css-loader' для импорта стилей и в конце 'style-loader' внедрит
    // стили в DOM
    return {
        test: /\.s[ac]ss$/i,
        // Порядок при котором лоадеры указываются в массиве 'use' имеет значение
        use: [
            isDev
            // Creates `style` nodes from JS strings
                ? 'style-loader'
            // ...
                : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.includes('.module.'),
                        // ???exportLocalsConvention: 'camelCase',
                        localIdentName: isDev
                            ? '[path][name]-[local]'
                            : '[name]_[local]__[hash:base64:5]',
                    },
                },
            },
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };
}
