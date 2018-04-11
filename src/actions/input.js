import { INPUT_CHANGE } from './action-types';

export const changeInput = input => ({
	type: INPUT_CHANGE,
	input: input,
});
