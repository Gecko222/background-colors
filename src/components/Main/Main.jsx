import React, { Component } from 'react';

import './main.css';

import AcceptButton from '../AcceptButton/AcceptButton';
import AutoComplete from '../AutoComplete/AutoComplete';

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
				<AutoComplete />
				<AcceptButton />
			</div>
		);
	}
}

export default Main;
