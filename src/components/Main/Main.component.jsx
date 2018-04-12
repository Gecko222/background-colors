import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';

import './main.css';

import AcceptButton from '../accept-button/accept-button.component';
import Autocomplete from '../autocomplete/autocomplete.component';
import { fetchColors } from '../../actions/colors.action';

/**
 * main component
 */
class Main extends Component {
	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div className="content">
				{
					this.props.fetched ?
						this.props.fetchError ? this._renderError() :
							this._renderContent() :
						this._renderWait()
				}
			</div>
		);
	}

	/**
	 * component did mount.
	 * fetch colors from source
	 */
	componentDidMount() {
		this.props.fetchColors();
	}

	/**
	 * render wait information
	 * @return {ReactElement}
	 */
	_renderWait() {
		return <div>Loading data, please wait...</div>;
	}

	/**
	 * render error information
	 * @return {ReactElement}
	 */
	_renderError() {
		return <div>Failed to get data, please try again later.</div>;
	}

	/**
	 * render app content
	 * @return {ReactFragment}
	 */
	_renderContent() {
		return <Fragment>
			<Autocomplete items={this._getItems()} />
			<AcceptButton />
		</Fragment>;
	}

	/**
	 * get items list
	 * @return {Object[]}
	 */
	_getItems() {
		return map(this.props.colors, color => color.name);
	}

	static propTypes = {
		fetchColors: PropTypes.func.isRequired,
		fetched: PropTypes.bool.isRequired,
		fetchError: PropTypes.bool.isRequired,
		colors: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			hes: PropTypes.string,
		})),
	}
}

const mapStateToProps = ({ appState }, props) => {
	return {
		fetched: appState.fetched,
		fetchError: appState.fetchError,
		colors: appState.colors || [],
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchColors: () => fetchColors(dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
