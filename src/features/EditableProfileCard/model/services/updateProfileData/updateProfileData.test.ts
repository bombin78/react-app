import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

const data = {
    id: '1',
    username: 'admin',
    age: 30,
    country: Country.China,
    lastname: 'ivanov',
    first: 'ivan',
    city: 'Пикин',
    currency: Currency.CNY,
};

describe('updateProfileData.test', () => {
    test('Success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        // Получаем "моковую" data
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        // Проверим, что запрос на сервер был отправлен
        expect(thunk.api.put).toHaveBeenCalled();
        // Проверим, что AsyncThunk отработал без ошибок
        expect(result.meta.requestStatus).toBe('fulfilled');
        // Проверим, что payload возвращает данные c бэкенда
        expect(result.payload).toEqual(data);
    });

    test('Error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR,
        ]);
    });

    test('Validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: {
                    ...data,
                    lastname: '',
                },
            },
        });
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
});
