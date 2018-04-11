import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import './accept-button.css';

/**
 * Accept button
 */
class AcceptButton extends Component {
	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return <button
			className="accept-button"
			onClick={ () => this._onClick() }
		>
			Accept
		</button>;
	}

	/**
	 * on button click
	 */
	_onClick() {
		const { colors, input } = this.props;
		const color = find(colors, color => color.name === input);

		if (color && color.hex) {
			document.body.style.backgroundColor = `#${color.hex}`;
		}
	}

	static propTypes = {
		colors: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			hes: PropTypes.string,
		})),
		input: PropTypes.string,
	}
}

const mapStateToProps = ({ appState }, props) => {
	return {
		colors: appState.colors,
		input: appState.input,
	};
};

export default connect(mapStateToProps)(AcceptButton);
