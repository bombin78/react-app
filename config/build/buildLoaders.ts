import { RuleSetRule } from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
    // https://v4.webpack.js.org/loaders/file-loader/
    // https://webpack.js.org/guides/asset-modules/
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    // https://www.npmjs.com/package/@svgr/webpack
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // https://babeljs.io/setup#installation
    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                // https://i18next-extract.netlify.app/#
                // https://i18next-extract.netlify.app/#/configuration?id=locales
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                ],
            },
        },
    };

    const cssLoader = buildCssLoader(isDev);

    // Если бы писали на нативном js, то для обработки jsx понадобился бы
    // babel-loader. Но ts-loader умеет обрабатывать jsx самостоятельно
    const typeScriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    // Порядок при котором лоадеры возвращаются в массиве имеет значение
    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typeScriptLoader,
        cssLoader,
    ];
}
