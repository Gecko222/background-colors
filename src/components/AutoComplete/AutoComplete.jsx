import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

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
	 *
	 */
	componentDidMount() {
		this.setState({
			items: map(
				this.props.items,
				item =>
					<AutoCompleteItem
						key={item}
						text={item}
						onItemClick={ event => this._onItemClick(event) }
					/>
			),
		});
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
		>
			{ this.state.items }
		</div>;
	}

	/**
	 * on item click
	 * @param {Event} event
	 */
	_onItemClick(event) {
		this.setState({
			itemClicked: true,
		});

		// input value
	}

	static propTypes = {
		items: PropTypes.PropTypes.arrayOf(PropTypes.string),
	}
}

export default AutoComplete;
