import webpack, {
    WebpackPluginInstance,
} 							from 'webpack';
import HtmlWebpackPlugin 	from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } 	from './types/config';

export function buildPlugins({
    paths,
    isDev,
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
        }),
    ];

    plugins.push(
        // Плагин для визуализации размер выходных файлов веб-пакета с помощью
        // интерактивной масштабируемой древовидной карты
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }),
    );

    if (isDev) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        );
    }

    return plugins;
}
