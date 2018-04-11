import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';

import {
	selectItem,
	clickItem,
} from '../../actions/autocomplete';

/**
 * Auto complete suggest list
 */
class AutocompleteSuggest extends Component {
	/**
	 * constructor
	 * @param {object} props
	 */
	constructor(props) {
		super(props);

		this.itemsRefs = {};
	}

	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		if (!this.props.focus) {
			return null;
		}

		return <div	className="auto-complete-list">
			{ this._getItems() }
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
	 * get items
	 * @return {AutoCompleteItem[]}
	 */
	_getItems() {
		return map(
			this.props.filteredItems,
			(item, key) => {
				const selected = this.props.selected === key ?
					'auto-complete-item-selected' : '';

				return <div
					className={`auto-complete-item ${selected}`}
					key={ key }
					onMouseDown={ () => this.props.clickItem(item) }
					onMouseEnter={ () => this.props.selectItem(key) }
					ref= { item => this.itemsRefs[key] = item }
				>
					{ item }
				</div>;
			}
		);
	}

	/**
	 * update list view
	 */
	_updateListView() {
		const itemRef = this.itemsRefs[this.props.selected];

		if (!itemRef) {
			return;
		}

		if (itemRef.scrollIntoViewIfNeeded) {
			itemRef.scrollIntoViewIfNeeded();
		} else {
			itemRef.scrollIntoView();
		}
	}

	static propTypes = {
		filteredItems: PropTypes.arrayOf(PropTypes.string),
		selected: PropTypes.number,
		inputValue: PropTypes.string,
		focus: PropTypes.bool,
		selectItem: PropTypes.func,
		clickItem: PropTypes.func,
	}
}

const mapStateToProps = ({ autocomplete }, props) => {
	return {
		inputValue: autocomplete.input || '',
		selected: autocomplete.selected || 0,
		focus: autocomplete.focus || false,
		filteredItems: autocomplete.filteredItems || [],
	};
};

const mapDispatchToProps = dispatch => {
	return {
		selectItem: itemKey => dispatch(selectItem(itemKey)),
		clickItem: value => dispatch(clickItem(value)),
		setItems: items => dispatch(setItems(items)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteSuggest);

