import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, filter } from 'lodash';

import './auto-complete.css';

import AutoCompleteItem from './AutoCompleteItem';
import keyActions from './key-actions';

/**
 * Auto complete field
 */
class AutoComplete extends Component {
	/**
	 * constructor
	 * @param {object} props
	 */
	constructor(props) {
		super(props);

		this.input = React.createRef();
		this.itemsRefs = {};
		this.state = {
			focused: false,
			itemClicked: false,
			selected: 0,
			inputValue: '',
		};
	}
	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return <div
			className="auto-complete-wrapper"
		>
			{ this._renderInput() }
			{ this.state.focused && this._renderList() }
		</div>;
	}

	/**
	 * component did update
	 * @param {object} prevProps
	 * @param {object} prevState
	 */
	componentDidUpdate(prevProps, prevState) {
		this._updateListView();
	}

	/**
	 * return input field
	 * @return {ReactElement}
	 */
	_renderInput() {
		return <input
			className="auto-complete-field"
			onFocus={ () => this._onFocus() }
			onBlur={ () => this._onBlur() }
			ref={ this.input }
			value={this.state.inputValue}
			onChange={ event => this._onInputChange(event.target.value) }
			onKeyDown={ event => this._onKeyDown(event) }
		/>;
	}

	/**
	 * on input focus
	 */
	_onFocus() {
		this.setState({ focused: true });
	}

	/**
	 * on input blur
	 */
	_onBlur() {
		if (this.state.itemClicked) {
			this.setState({
				itemClicked: false,
			});
			this.input.current.focus();

			return;
		}

		this.setState({ focused: false });
	}

	/**
	 * return autocomplete suggestions list
	 * @return {ReactElement}
	 */
	_renderList() {
		return <div
			className="auto-complete-list"
			ref={ this.itemsList }
		>
			{ this._getItems() }
		</div>;
	}

	/**
	 * on item click
	 * @param {string} itemValue
	 */
	_onItemClick(itemValue) {
		this.setState({
			itemClicked: true,
		});

		this._onInputChange(itemValue);
	}

	/**
	 * on input change
	 * @param {string} input
	 */
	_onInputChange(input) {
		this.setState({
			inputValue: input,
		});

		this.props.onInputChange && this.props.onInputChange(input);
	}

	/**
	 * get items
	 * @return {AutoCompleteItem[]}
	 */
	_getItems() {
		const { inputValue } = this.state;

		if (inputValue.length >= 2) {
			return this._createItems(this._getFilteredColors(inputValue));
		}

		return this._createItems(this.props.items);
	}

	/**
	 * get filtered items
	 * @param {string} inputValue
	 * @return {string[]}
	 */
	_getFilteredColors(inputValue) {
		return filter(
			this.props.items,
			item => item.includes(inputValue)
		);
	}

	/**
	 * create items
	 * @param {string[]} itemsList
	 * @return {AutoCompleteItem[]}
	 */
	_createItems(itemsList) {
		return map(
			itemsList,
			(item, key) =>
				<AutoCompleteItem
					key={key}
					text={item}
					selected={this.state.selected == key}
					onItemClick={ () => this._onItemClick(item) }
					onMouseEnter={ () => this._selectItem(key) }
					divRef={ item => this.itemsRefs[key] = item }
				/>
		);
	}

	/**
	 * change selected item
	 * @param {number} key
	 */
	_selectItem(key) {
		this.setState({
			selected: key,
		});
	}

	/**
	 * update list view
	 */
	_updateListView() {
		const itemRef = this.itemsRefs[this.state.selected];

		if (!itemRef) {
			return;
		}

		if (itemRef.scrollIntoViewIfNeeded) {
			itemRef.scrollIntoViewIfNeeded();
		} else {
			itemRef.scrollIntoView();
		}
	}

	/**
	 *
	 * @param {Event} event
	 */
	_onKeyDown(event) {
		keyActions[event.key] && keyActions[event.key].call(this, event);
	}

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.string),
		onInputChange: PropTypes.func,
	}
}

export default AutoComplete;
