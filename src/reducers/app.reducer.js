import {
	COLOR_FETCH_SUCCESS,
	COLOR_FETCH_FAIL,
	INPUT_CHANGE,
} from '../actions/action-types';

const appReducer = (state = {}, action) => {
	switch (action.type) {
		case COLOR_FETCH_SUCCESS:
			return {
				...state,
				fetched: true,
				colors: action.colors,
			};
		case COLOR_FETCH_FAIL:
			return {
				...state,
				fetched: true,
				fetchError: true,
			};
		case INPUT_CHANGE:
			return {
				...state,
				input: action.input,
			};
		default:
			return state;
	}
};

export default appReducer;
