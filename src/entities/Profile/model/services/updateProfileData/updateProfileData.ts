import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const {
            getState,
            extra,
            rejectWithValue,
        } = thunkAPI;

        // Внутри AsyncThunk для получения данных из state используем не useSelector, а getState
        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put<Profile>('/profile', formData);

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
