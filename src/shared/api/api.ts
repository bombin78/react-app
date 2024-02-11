import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

// Создаем инстанс axios
export const $api = axios.create({
    baseURL: __API__,
});

// C помощью interceptors, который будет отрабатывать перед запросом,
// добавляем поле authorization, чтобы оно не было пустым в запросе
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
