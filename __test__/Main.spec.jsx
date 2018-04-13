import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

import Main from '../src/components/main/main.component';

// Snapshot for Home React Component
describe('>>>Main --- Snapshot', () => {
	const initialState = {
		appState: {
			fetched: false,
			fetchError: false,
			colors: [],
		},
		autocomplete: {},
	};
    const mockStore = configureStore();

	it('+++capturing Snapshot of Main loading', () => {
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><Main /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	it('+++capturing Snapshot of Main with error', () => {
		const store = mockStore({
			...initialState,
			appState: {
				...initialState.appState,
				fetched: true,
				fetchError: true,
			},
		});
		const wrapper = mount( <Provider store={store}><Main /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	it('+++capturing Snapshot of Main', () => {
		const store = mockStore({
			...initialState,
			appState: {
				...initialState.appState,
				fetched: true,
				fetchError: false,
			},
		});
		const wrapper = mount( <Provider store={store}><Main /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});
