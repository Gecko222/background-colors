import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Auto complete field
 */
class AutoCompleteItem extends Component {
	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		const { text, onItemClick, onMouseEnter } = this.props;
		const selected = this.props.selected ? 'auto-complete-item-selected' : '';

		return <div
			className={`auto-complete-item ${selected}`}
			key={ text }
			onMouseDown={ e => onItemClick && onItemClick(e) }
			onMouseEnter={ e => onMouseEnter && onMouseEnter(e) }
			ref= { item => this.props.divRef && this.props.divRef(item) }
		>
			{ text }
		</div>;
	}

	static propTypes = {
		text: PropTypes.string.isRequired,
		onItemClick: PropTypes.func,
		selected: PropTypes.bool,
		onMouseEnter: PropTypes.func,
		divRef: PropTypes.func,
	}
}

export default AutoCompleteItem;
