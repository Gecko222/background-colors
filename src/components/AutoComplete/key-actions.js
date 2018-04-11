import { findIndex, filter } from 'lodash';

/**
 * arrow down event
 * @param {Event} event
 */
const ArrowDown = function(event) {
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
const ArrowUp = function(event) {
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
const Enter = function(event) {
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

export default {
	ArrowDown,
	ArrowUp,
	Enter,
};
