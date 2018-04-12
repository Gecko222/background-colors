import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	changeInput,
	setFocus,
	clickItemDone,
	selectItem,
} from '../../actions/autocomplete.action';
import * as keyActions from './key-actions';

/**
 * Auto complete field
 */
class AutocompleteInput extends Component {
	/**
	 * constructor
	 * @param {object} props
	 */
	constructor(props) {
		super(props);

		this.input = React.createRef();
	}

	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return <input
			className="auto-complete-field"
			onFocus={ () => this._onFocus() }
			onBlur={ () => this._onBlur() }
			ref={ this.input }
			value={this.props.input}
			onChange={ event => this._onChange(event) }
			onKeyDown={ event => this._onKeyDown(event) }

		/>;
	}
	/**
	 * on input change
	 * @param {Event} event
	 */
	_onChange(event) {
		const value = event.target.value;

		this.props.changeInput(value);
	}


	/**
	 * on input focus
	 */
	_onFocus() {
		this.props.setFocus(true);
	}

	/**
	 * on input blur
	 */
	_onBlur() {
		if (this.props.clicked) {
			this.props.clickItemDone()
			this.input.current.focus();

			return;
		}

		this.props.setFocus(false);

	}

	/**
	 * on key down
	 * @param {Event} event
	 */
	_onKeyDown(event) {
		keyActions[event.key] && keyActions[event.key].call(this, event);
	}

	static propTypes = {
		filteredItems: PropTypes.arrayOf(PropTypes.string),
		input: PropTypes.string.isRequired,
		clicked: PropTypes.bool.isRequired,
		selected: PropTypes.number.isRequired,
		changeInput: PropTypes.func.isRequired,
		setFocus: PropTypes.func.isRequired,
		clickItemDone: PropTypes.func.isRequired,
		selectItem: PropTypes.func.isRequired,
	}
}

const mapStateToProps = ({ autocomplete }, props) => {
	return {
		input: autocomplete.input || '',
		clicked: autocomplete.clicked || false,
		filteredItems: autocomplete.filteredItems || [],
		selected: autocomplete.selected || 0,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeInput: value => dispatch(changeInput(value)),
		setFocus: focus => dispatch(setFocus(focus)),
		clickItemDone: focus => dispatch(clickItemDone()),
		selectItem: itemKey => dispatch(selectItem(itemKey)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteInput);
