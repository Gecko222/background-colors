import {
	COLOR_FETCH_SUCCESS,
	COLOR_FETCH_FAIL,
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
		default:
			return state;
	}
};

export default appReducer;
