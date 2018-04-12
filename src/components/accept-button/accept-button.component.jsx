import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import './accept-button.css';

/**
 * Accept button
 */
export class AcceptButton extends Component {
	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return <button
			className="accept-button"
			onClick={() => this._onClick()}
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
			const rgb = this._hexToRgb(color.hex);
			const backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;

			document.body.style.backgroundColor = backgroundColor;
		}
	}

	/**
	 * converts hex to rgb
	 * @param {string} hex
	 * @return {object}
	 */
	_hexToRgb(hex) {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

		hex = hex.replace(shorthandRegex, (m, r, g, b) => {
			return r + r + g + g + b + b;
		});

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		} : null;
	}


	static propTypes = {
		colors: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			hes: PropTypes.string,
		})),
		input: PropTypes.string,
	}
}

const mapStateToProps = ({ appState, autocomplete: { input } }, props) => {
	return {
		colors: appState.colors,
		input,
	};
};

export default connect(mapStateToProps)(AcceptButton);
