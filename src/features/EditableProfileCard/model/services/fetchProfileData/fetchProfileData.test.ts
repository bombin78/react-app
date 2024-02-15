import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

const data = {
    username: 'admin',
    age: 30,
    country: Country.China,
    lastname: 'ivanov',
    first: 'ivan',
    city: 'Пикин',
    currency: Currency.CNY,
};

describe('fetchProfileData.test', () => {
    test('Success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        // Получаем "моковую" data
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('1');

        // Проверим, что запрос на сервер был отправлен
        expect(thunk.api.get).toHaveBeenCalled();
        // Проверим, что AsyncThunk отработал без ошибок
        expect(result.meta.requestStatus).toBe('fulfilled');
        // Проверим, что payload возвращает данные c бэкенда
        expect(result.payload).toEqual(data);
    });

    test('Error login', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
