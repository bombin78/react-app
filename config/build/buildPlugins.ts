import webpack, {
    WebpackPluginInstance,
} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): WebpackPluginInstance[] {
    const plugins = [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        // С помощью DefinePlugin можно прокидывать глобальные переменные
        // в само приложение: https://webpack.js.org/plugins/define-plugin/
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // Копирует отдельные файлы или целые каталоги,
        // которые уже существуют, в каталог сборки
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
    ];

    if (isDev) {
        plugins.push(
            // Плагин (ЭКСПЕРИМЕНТАЛЬНЫЙ) для включения «быстрого обновления»
            // (также известного как Hot Reloading) для компонентов React.
            new ReactRefreshWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            // Плагин для визуализации размер выходных файлов веб-пакета с помощью
            // интерактивной масштабируемой древовидной карты
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
        );
    }

    return plugins;
}
