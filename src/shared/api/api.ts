import axios from 'axios';
import { LOCAL_STORAGE_THEME_KEY } from '../../app/providers/ThemeProvider/lib/ThemeContext';

// Создаем инстанс axios
export const $api = axios.create({
    baseURL: __API__,
});

// C помощью interceptors, который будет отрабатывать перед запросом,
// добавляем поле authorization, чтобы оно не было пустым в запросе
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || '';
    }
    return config;
});
