import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, filter } from 'lodash';

import './auto-complete.css';

import AutoCompleteItem from './AutoCompleteItem';

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
		this.state = {
			focused: false,
			itemClicked: false,
			items: [],
		};
	}

	/**
	 * component did mount
	 */
	componentDidMount() {
		this._createItems(this.props.items);
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
	 * return input field
	 * @return {ReactElement}
	 */
	_renderInput() {
		return <input
			className="auto-complete-field"
			onFocus={ () => this._onFocus() }
			onBlur={ () => this._onBlur() }
			ref={ this.input }
			onChange={ event => this._onInputChange(event.target.value) }
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
		return <div	className="auto-complete-list">
			{ this.state.items }
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

		this.input.current.value = itemValue;
		this._onInputChange(itemValue);
	}

	/**
	 * on input change
	 * @param {string} input
	 */
	_onInputChange(input) {
		if (input.length >= 2) {
			this._createItems(filter(
				this.props.items,
				item => item.includes(input)
			));
		} else {
			this._createItems(this.props.items);
		}

		this.props.onInputChange && this.props.onInputChange(input);
	}

	/**
	 * create items
	 * @param {string[]} itemsList
	 */
	_createItems(itemsList) {
		this.setState({
			items: map(
				itemsList,
				item =>
					<AutoCompleteItem
						key={item}
						text={item}
						onItemClick={ () => this._onItemClick(item) }
					/>
			),
		});
	}

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.string),
		onInputChange: PropTypes.func,
	}
}

export default AutoComplete;
