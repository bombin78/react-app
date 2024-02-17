// TODO: разобраться с Warning: `fetch` is not available.
// Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments
// Один из вариантов решения здесь: https://stackoverflow.com/a/72323038 (установить и
// импортировать пакет "whatwg-fetch" в файл для настройки тестов)
import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import userEvent from '@testing-library/user-event';
import { $api } from 'shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slices/profileSlice';

const profile: Profile = {
    id: '1',
    first: 'admin1',
    lastname: 'admin2',
    age: 100,
    currency: Currency.INR,
    country: Country.China,
    city: 'St.Petersburg',
    username: 'admin123',
};

// В опциях находятся данные с которыми будет работать компонент
const options = {
    initialState: {
        profile: {
            readonly: true,
            // data и form - один и тот же объект
            // пока не меняются данные в форме
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin123' },
        },
    },
    // Монтируем редьюсеры для компонентов в которых они требуются
    // с указанием поля для которого мы хотим его монтировать
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('Режим readonly должен измениться на ражим редактирования', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        // Нажимаем на кнопку "Редактировать"
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // и смотрим появилась ли кнопка "Отменить"
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('При отмене значения должны обнуляться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        // Нажимаем на кнопку "Редактировать"
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        // Очищаем поля с именем
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        // и фамилией пользователя
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        // Теперь записываем новое имя "user1"
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user1');
        // и новую фамилию "user2" в те же самые поля
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user2');

        // Проверяем, что новые значения попали в поле ввода имении и фамилии
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user1');
        // и фамилии
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user2');

        // Нажимаем кнопку отмены
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        // После чего в эти поля должны вернуться прежние значения
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin1');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin2');
    });

    test('Должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        // Нажимаем на кнопку "Редактировать"
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        // Очищаем поле с именем пользователя
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        // После чего нажимает кнопку "Сохранить"
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        // и ожидаем, что в интерфейсе появилась ошибка
        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('Если нет ошибок, то на сервер должен уйти PUT запрос', async () => {
        // Мокаем объект и метод, который будем проверять на вызов
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);

        // Нажимаем на кнопку "Редактировать"
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        // Записываем новое имя "user1"
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user1');

        // После чего нажимает кнопку "Сохранить"
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        // Проверяем, что метод для put запроса был вызван
        expect(mockPutReq).toHaveBeenCalled();
    });
});
