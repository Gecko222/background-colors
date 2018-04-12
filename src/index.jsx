import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.html';

import reducers from './reducers';
import Main from './components/main/main.component';

const store = createStore(reducers,
	{
		appState: {
			fetched: false,
			fetchError: false,
			colors: [],
		},
		autocomplete: {},
	},
	(process.env.NODE_ENV !== 'production' ?
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
		undefined
	)
);

ReactDOM.render(
  <Provider store={ store }><Main /></Provider>,
  document.getElementById('root')
);
