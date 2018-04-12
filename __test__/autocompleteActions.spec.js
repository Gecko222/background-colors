import {
	AC_INPUT_CHANGE,
	AC_SET_ITEMS,
	AC_SET_FILTERED_ITEMS,
	AC_SET_FOCUS,
	AC_CLICK_ITEM,
	AC_CLICK_ITEM_DONE,
	AC_SELECT_ITEM,
} from '../src/actions/action-types';
import {
	changeInput,
	setItems,
	setFilteredItems,
	setFocus,
	clickItem,
	clickItemDone,
	selectItem,
} from '../src/actions/autocomplete';

describe('>>>ACTION --- autocomplete', () => {
	it('+++ actionCreator changeInput', () => {
		const action = changeInput('Test');

		expect(action).toEqual({
			type: AC_INPUT_CHANGE,
			input: 'Test',
		});
	});

	it('+++ actionCreator setItems', () => {
		const items = [
			'one',
			'two',
		];
		const action = setItems(items);

		expect(action).toEqual({
			type: AC_SET_ITEMS,
			items,
		});
	});

	it('+++ actionCreator setFilteredItems', () => {
		const items = [
			'one',
			'two',
		];
		const action = setFilteredItems(items);

		expect(action).toEqual({
			type: AC_SET_FILTERED_ITEMS,
			filteredItems: items,
		});
	});

	it('+++ actionCreator setFocus', () => {
		let action = setFocus(true);

		expect(action).toEqual({
			type: AC_SET_FOCUS,
			focus: true,
		});

		action = setFocus(false);

		expect(action).toEqual({
			type: AC_SET_FOCUS,
			focus: false,
		});
	});

	it('+++ actionCreator clickItem', () => {
		const action = clickItem('item');

		expect(action).toEqual({
			type: AC_CLICK_ITEM,
			input: 'item',
		});
	});

	it('+++ actionCreator clickItemDone', () => {
		const action = clickItemDone();

		expect(action).toEqual({
			type: AC_CLICK_ITEM_DONE,
		});
	});

	it('+++ actionCreator selectItem', () => {
		const action = selectItem(2);

		expect(action).toEqual({
			type: AC_SELECT_ITEM,
			itemKey: 2,
		});
	});
});
