import { ResolveOptions } from 'webpack';


export function buildResolvers(): ResolveOptions {
  return {
    // Указываем расширение тех файлов для которых
    // при импорте мы не будем указывать расширение
    extensions: [".tsx", ".ts", ".js"],
  };
}
