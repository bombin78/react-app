import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

// Параметры дженерика:
// первый - тип для того что возвращается,
// второй - тип для аргументов,
// третий - тип для конфигурации API.
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const {
            dispatch,
            rejectWithValue,
            extra,
        } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/login', authData);
            // Если с сервера вернулся пустой ответ, то будем считать, что это ошибка
            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            extra.navigate('/about');

            // По умолчанию, возвращаемые данные оборачиваются в thunkAPI.fulfillWithValue()
            return response.data;
        } catch (e) {
            console.log(e);
            // Используйте "e.response.data" в качестве "action.payload" для "rejected"
            // действия, явно возвращая его с помощью утилиты "rejectWithValue()":
            // thunkAPI.rejectWithValue(e.response.data);
            return rejectWithValue('error');
        }
    },
);
