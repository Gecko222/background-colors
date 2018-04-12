import filter from 'lodash/filter';

import {
	AC_INPUT_CHANGE,
	AC_SET_ITEMS,
	AC_SET_FILTERED_ITEMS,
	AC_SET_FOCUS,
	AC_CLICK_ITEM,
	AC_CLICK_ITEM_DONE,
	AC_SELECT_ITEM,
} from '../actions/action-types';

const autocompleteReducer = (state = {}, action) => {
	switch (action.type) {
		case AC_INPUT_CHANGE:
			let items = filteredItems = state.items.concat();
			let filteredItems = [];

			if (action.input.length >= 2) {
				filteredItems = filter(
					items,
					item => item.includes(action.input)
				);
			} else {
				filteredItems = items;
			}

			return {
				...state,
				input: action.input,
				filteredItems,
			};
		case AC_SET_ITEMS:
			return {
				...state,
				items: action.items,
			};
		case AC_SET_FILTERED_ITEMS:
			return {
				...state,
				filteredItems: action.filteredItems,
			};
		case AC_SET_FOCUS:
			return {
				...state,
				focus: action.focus,
			};
		case AC_CLICK_ITEM:
			return {
				...state,
				clicked: true,
				input: action.input,
			};
		case AC_CLICK_ITEM_DONE:
			return {
				...state,
				clicked: false,
			};
		case AC_SELECT_ITEM:
			return {
				...state,
				selected: action.itemKey,
			};
		default:
			return state;
	}
};

export default autocompleteReducer;
