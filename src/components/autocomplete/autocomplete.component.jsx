import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './autocomplete.css';

import AutocompleteSuggestedList from './autocomplete-suggested-list.component';
import AutocompleteInput from './autocomplete-input.component';
import {
	setItems,
	setFilteredItems,
} from '../../actions/autocomplete.action';

/**
 * Auto complete field
 */
export class Autocomplete extends Component {
	/**
	 * component did mount
	 * @param {object} props
	 */
	componentDidMount() {
		this.props.setItems(this.props.items);
		this.props.setFilteredItems(this.props.items);
	}

	/**
	 * component did update
	 */
	componentDidUpdate() {
		this.props.setItems(this.props.items);
	}

	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return <div className="autocomplete-wrapper">
			<AutocompleteInput />
			<AutocompleteSuggestedList />
		</div>;
	}

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.string),
		setItems: PropTypes.func,
		setFilteredItems: PropTypes.func,
	}
}

const mapStateToProps = ({ autocomplete }, props) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		setItems: items => dispatch(setItems(items)),
		setFilteredItems: items => dispatch(setFilteredItems(items)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
