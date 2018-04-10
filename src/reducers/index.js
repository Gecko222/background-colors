import { combineReducers } from 'redux';

import appReducer from './app.reducer';

const reducers = combineReducers({
	appState: appReducer,
});

export default reducers;
