import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
    // Указываем расширение тех файлов для которых
    // при импорте мы не будем указывать расширение
        extensions: ['.tsx', '.ts', '.js'],
        // Устанавливаем приоритет абсолютных путей
        preferAbsolute: true,
        // Сообщает webpack, в каких каталогах следует искать при разрешении модулей
        modules: [options.paths.src, 'node_modules'],
        // Имя файла, которое будет использоваться при разрешении директорий
        mainFiles: ['index'],
        // Алиасы (псевдонимы) для упрощения импорта или запроса определенных модулей,
        // пока не указываем так как будем использовать абсолютные пути без алиасов
        alias: {},
    };
}
