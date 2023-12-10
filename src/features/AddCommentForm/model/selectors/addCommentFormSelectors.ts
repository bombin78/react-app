import { StateSchema } from 'app/providers/StoreProvider';

// Используем оператор нулевого слияния (nullish coalescing operator) вместо оператора "или",
// чтобы при вводе в input значения "0" оно не было преобразовано в "false"
export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';

export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
