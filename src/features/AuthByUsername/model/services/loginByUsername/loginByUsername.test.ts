import axios from 'axios';
// import { Dispatch } from '@reduxjs/toolkit';
// import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
    test('Success login', async () => {
        const userValue = { id: '1', username: 'abv' };

        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

        const result = await thunk.callThunk({
            username: 'abv',
            password: '123',
        });

        // Проверим, что dispatch был вызван экшеном и данными userValue
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        // Проверим, что dispatch был вызван 3 раза
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        // Проверим, что запрос на сервер был отправлен
        expect(thunk.api.post).toHaveBeenCalled();
        // Проверим, что AsyncThunk отработал без ошибок
        expect(result.meta.requestStatus).toBe('fulfilled');
        // Проверим, что payload в возвращает данные о пользователе
        expect(result.payload).toBe(userValue);
    });

    test('Error login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk({
            username: 'abv',
            password: '123',
        });

        // Проверим, что dispatch был вызван 2 раза
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        // Проверим, что запрос на сервер был отправлен
        expect(thunk.api.post).toHaveBeenCalled();
        // Проверим, что AsyncThunk отработал c ошибкой
        expect(result.meta.requestStatus).toBe('rejected');
        // Проверим, что payload в случае ошибки равняется 'error'
        expect(result.payload).toBe('error');
    });

    // Первоначальный код тестов (до создания класса "TestAsyncThunk")
    // let dispatch: Dispatch;
    // let getState: () => StateSchema;

    // // Отрабатывает перед каждым тестом
    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });

    // test('Success login', async () => {
    //     const userValue = { id: '1', username: 'abv' };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    //     const action = loginByUsername({
    //         username: 'abv',
    //         password: '123',
    //     });
    //     const result = await action(dispatch, getState, undefined);

    //     // Проверим, что dispatch был вызван экшеном и данными userValue
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //     // Проверим, что dispatch был вызван 3 раза
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     // Проверим, что запрос на сервер был отправлен
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     // Проверим, что AsyncThunk отработал без ошибок
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     // Проверим, что payload в возвращает данные о пользователе
    //     expect(result.payload).toBe(userValue);
    // });

    // test('Error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({
    //         username: 'abv',
    //         password: '123',
    //     });
    //     const result = await action(dispatch, getState, undefined);

    //     // Проверим, что dispatch был вызван 2 раза
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     // Проверим, что запрос на сервер был отправлен
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     // Проверим, что AsyncThunk отработал c ошибкой
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     // Проверим, что payload в случае ошибки равняется 'error'
    //     expect(result.payload).toBe('error');
    // });
});
