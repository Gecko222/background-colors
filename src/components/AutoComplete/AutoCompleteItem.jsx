import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Auto complete field
 */
class AutoCompleteItem extends Component {
	/**
	 * render
	 */
	render() {
		const { text, onItemClick } = this.props;

		return <div
			className="auto-complete-item"
			key={ text }
			onMouseDown={ e => onItemClick && onItemClick(e) }
		>
			{ text }
		</div>
	}

	static propTypes = {
		text: PropTypes.string.isRequired,
		onItemClick: PropTypes.func
	}
}

export default AutoCompleteItem;
