import { findIndex, filter } from 'lodash';

/**
 * arrow down event
 * @param {Event} event
 */
export const ArrowDown = function ArrowDown(event) {
	const { filteredItems, selected } = this.props;

	if (!filteredItems || !filteredItems.length) {
		return;
	}

	let index = selected + 1;

	if (index >= filteredItems.length) {
		index--;
	}

	this.props.selectItem(index);
};

/**
 * arrow up event
 * @param {Event} event
 */
export const ArrowUp = function ArrowUp(event) {
	const { filteredItems, selected } = this.props;

	if (!filteredItems || !filteredItems.length) {
		return;
	}

	let index = selected - 1;

	if (index < 0) {
		index++;
	}

	this.props.selectItem(index);
};

/**
 * enter event
 * @param {Event} event
 */
export const Enter = function Enter(event) {
	event.preventDefault();

	const { filteredItems, selected } = this.props;
	const color = filteredItems[selected];

	if (!color) {
		return;
	}

	this.props.changeInput(color);

	const selectedIndex = findIndex(
		filter(
			filteredItems,
			item => item.includes(color)
		),
		item => item === color
	);

	this.props.selectItem(selectedIndex);
};
