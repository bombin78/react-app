import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        // Позволяет выполнять прокси-запросы через указанную индексную страницу
        // (по умолчанию 'index.html '), полезный для одностраничных приложений,
        // использующих HTML5 History API.
        historyApiFallback: true,
        // Для автоматического открытия страницы в браузере
        open: true,
        // Включаем HMR
        hot: true,
    };
}
