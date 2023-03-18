import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
import { Counter } from './Counter';

describe('Counter', () => {
    test('№1 Test render', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 5 } },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('5');
    });

    test('№2 Increment', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 5 } },
        });
        userEvent.click(screen.getByTestId('increment-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('6');
    });

    test('№3 Decrement', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 5 } },
        });
        userEvent.click(screen.getByTestId('decrement-btn'));
        expect(screen.getByTestId('value-title')).toHaveTextContent('4');
    });
});
