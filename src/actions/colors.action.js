import {
	COLOR_FETCH_SUCCESS,
	COLOR_FETCH_FAIL,
} from './action-types';

export const fetchColors = dispatch => {
	return fetch('https://www.mocky.io/v2/5a37a7403200000f10eb6a2d')
		.then(
			response => response.json(),
			error => dispatch(fetchColorsFailed())
		)
		.then(data => dispatch(fetchColorsSuccess(data)))
		.catch(erro => dispatch(fetchColorsFailed()));
};

const fetchColorsFailed = () => ({
	type: COLOR_FETCH_FAIL,
});

const fetchColorsSuccess = colors => ({
	type: COLOR_FETCH_SUCCESS,
	colors,
});
