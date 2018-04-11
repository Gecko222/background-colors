import { combineReducers } from 'redux';

import appReducer from './app.reducer';
import autocompleteReducer from './autocomplete.reducer';

const reducers = combineReducers({
	appState: appReducer,
	autocomplete: autocompleteReducer,
});

export default reducers;
