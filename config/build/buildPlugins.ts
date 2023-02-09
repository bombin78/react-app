import webpack, {
	WebpackPluginInstance,
} 							from 'webpack';
import HtmlWebpackPlugin 	from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } 	from './types/config';


export function buildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {
	return [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
	];
}
