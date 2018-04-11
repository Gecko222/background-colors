import { findIndex } from 'lodash';

/**
 * arrow down event
 * @param {Event} event
 */
const ArrowDown = function(event) {
	const { inputValue } = this.state;
	const colors = this._getFilteredColors(inputValue);

	if (!colors || !colors.length) {
		return;
	}

	let index = this.state.selected + 1;

	if (index >= colors.length) {
		index--;
	}

	this.setState({
		selected: index,
	});
};

/**
 * arrow up event
 * @param {Event} event
 */
const ArrowUp = function(event) {
	const { inputValue } = this.state;
	const colors = this._getFilteredColors(inputValue);

	if (!colors || !colors.length) {
		return;
	}

	let index = this.state.selected - 1;

	if (index < 0) {
		index++;
	}

	this.setState({
		selected: index,
	});
};

/**
 * enter event
 * @param {Event} event
 */
const Enter = function(event) {
	event.preventDefault();
	const { inputValue, selected } = this.state;
	const color = this._getFilteredColors(inputValue)[selected];

	if (!color) {
		return;
	}

	this._onInputChange(color);

	const selectedIndex = findIndex(
		this._getFilteredColors(color),
		item => item === color
	);

	this.setState({
		selected: selectedIndex,
	});
};

export default {
	ArrowDown,
	ArrowUp,
	Enter,
};
