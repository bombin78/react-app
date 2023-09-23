// Уточнить откуда должен быть импорт, как ниже или из 'entities/Profile'
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
// Уточнить откуда должен быть импорт, как ниже или из 'entities/Profile'
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
    username: 'admin',
    age: 30,
    country: Country.China,
    lastname: 'ivanov',
    first: 'ivan',
    city: 'Пикин',
    currency: Currency.CNY,
};

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
            // @ts-ignore
            state as ProfileSchema,
            profileActions.setReadonly(true),
        )).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: {
                username: '',
            },
        };
        expect(profileReducer(
            // @ts-ignore
            state as ProfileSchema,
            profileActions.cancelEdit(),
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: {
                username: '12345',
            },
        };
        expect(profileReducer(
            // @ts-ignore
            state as ProfileSchema,
            profileActions.updateProfile({
                username: '1234567890',
            }),
        )).toEqual({
            form: { username: '1234567890' },
        });
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(profileReducer(
            // @ts-ignore
            state as ProfileSchema,
            updateProfileData.pending,
        )).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(profileReducer(
            // @ts-ignore
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
        )).toEqual({
            isLoading: false,
            data,
            form: data,
            readonly: true,
            validateErrors: undefined,
        });
    });
});
