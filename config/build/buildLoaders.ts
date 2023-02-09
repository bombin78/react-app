import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

// type getLocalIdent = (
//   context: LoaderContext,
//   localIdentName: string,
//   localName: string
// ) => string;
export function buildLoaders({isDev}: BuildOptions): RuleSetRule[] {

  // Например, в дев режиме сначала выполнится 'sass-loader', затем 
  // 'css-loader' для импорта стилей и в конце 'style-loader' внедрит 
  // стили в DOM
  const cssLoader = {
    test: /\.s[ac]ss$/i,
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
            //???exportLocalsConvention: 'camelCase',
            localIdentName: isDev
              ? '[path][name]-[local]'
              : '[name]_[local]__[hash:base64:5]',
          },
        }
      },
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // Если бы писали на нативном js, то для обработки jsx понадобился бы 
  // babel-loader. Но ts-loader умеет обрабатывать jsx самостоятельно
  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  // Порядок при котором лоадеры возвращаются в массиве use имеет значение
  return [
    cssLoader,
	  typeScriptLoader,
  ];
}
