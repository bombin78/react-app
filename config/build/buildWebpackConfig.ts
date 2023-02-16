import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(
    options: BuildOptions,
): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,

        entry: paths.entry,

        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },

        resolve: buildResolvers(options),

        module: {
            // Конфигурация лоадеров, которые предназначены
            // для обработки файлов выходящих за рамки JS
            rules: buildLoaders(options),
        },

        // Подключение и настройка плагинов
        plugins: buildPlugins(options),

        // Включаем source maps, чтобы упростить отслеживание ошибок и предупреждений.
        // Source maps сопоставляют скомпилированный код с исходным кодом.
        devtool: isDev ? 'inline-source-map' : undefined,

        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
