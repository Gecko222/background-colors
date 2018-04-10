import React, { Component } from 'react';

import './auto-complete.css';

/**
 * Auto complete field
 */
class AutoComplete extends Component {
	/**
	 * render
	 * @return {ReactElement}
	 */
	render() {
		return <div className="auto-complete-wrapper">
			<input className="auto-complete-field" />
			{this._renderList()}
		</div>;
	}

	/**
	 * return autocomplete suggestions list
	 */
	_renderList() {

	}
}

export default AutoComplete;
