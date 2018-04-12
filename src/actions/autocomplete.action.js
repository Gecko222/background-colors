import {
	AC_INPUT_CHANGE,
	AC_SET_ITEMS,
	AC_SET_FILTERED_ITEMS,
	AC_SET_FOCUS,
	AC_CLICK_ITEM,
	AC_CLICK_ITEM_DONE,
	AC_SELECT_ITEM,
} from './action-types';

export const changeInput = input => ({
	type: AC_INPUT_CHANGE,
	input,
});

export const setItems = items => ({
	type: AC_SET_ITEMS,
	items,
});

export const setFilteredItems = filteredItems => ({
	type: AC_SET_FILTERED_ITEMS,
	filteredItems,
});

export const setFocus = focus => ({
	type: AC_SET_FOCUS,
	focus,
});

export const clickItem = input => ({
	type: AC_CLICK_ITEM,
	input,
});

export const clickItemDone = () => ({
	type: AC_CLICK_ITEM_DONE,
});

export const selectItem = itemKey => ({
	type: AC_SELECT_ITEM,
	itemKey,
});
