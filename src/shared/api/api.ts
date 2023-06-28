import { LOCAL_STORAGE_THEME_KEY } from 'app/providers/ThemeProvider/lib/ThemeContext';
import axios from 'axios';

// Создаем инстанс axios
export const $api = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_THEME_KEY),
    },
});
