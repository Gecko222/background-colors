import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

import AutocompleteInput
from '../src/components/autocomplete/autocomplete-input.component';
import {
	AC_SET_FOCUS,
	AC_CLICK_ITEM_DONE,
	AC_INPUT_CHANGE,
	AC_SELECT_ITEM,
} from '../src/actions/action-types';

describe('>>>AutocompleteInput --- Snapshot', () => {
	const initialState = {
		appState: {
			fetched: false,
			fetchError: false,
			colors: [],
		},
		autocomplete: {},
	};
	const mockStore = configureStore();

	it('+++capturing Snapshot of AutocompleteInput', () => {
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>>AutocompleteInput', () => {
	const mockStore = configureStore();

	it('it should dispatch on focus', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [{
					name: 'Test',
					hex: 'fff',
				}],
			},
			autocomplete: {
				input: 'Test',
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );

		wrapper.find('.auto-complete-field').simulate('focus');

		expect(dispatchSpy.calledWith({
			type: AC_SET_FOCUS,
			focus: true,
		}))
			.toEqual(true);
	});

	it('it should dispatch on blur', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [{
					name: 'Test',
					hex: 'fff',
				}],
			},
			autocomplete: {
				input: 'Test',
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );

		wrapper.find('.auto-complete-field').simulate('blur');

		expect(dispatchSpy.calledWith({
			type: AC_SET_FOCUS,
			focus: false,
		}))
			.toEqual(true);
	});

	it('it should dispatch after item click on blur', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [{
					name: 'Test',
					hex: 'fff',
				}],
			},
			autocomplete: {
				input: 'Test',
				clicked: true,
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );
		const input = wrapper.find('.auto-complete-field');

		input.simulate('focus');
		input.simulate('blur');

		expect(dispatchSpy.calledWith({
			type: AC_CLICK_ITEM_DONE,
		}))
			.toEqual(true);
	});

	it('it should dispatch on change', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [{
					name: 'Test',
					hex: 'fff',
				}],
			},
			autocomplete: {
				input: 'Test',
				clicked: true,
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );
		const input = wrapper.find('.auto-complete-field');

		input.simulate('change');

		expect(dispatchSpy.calledWith({
			type: AC_INPUT_CHANGE,
			input: 'Test',
		}))
			.toEqual(true);
	});

	it('it should dispatch on enter keydown', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [{
					name: 'Test',
					hex: 'fff',
				}],
			},
			autocomplete: {
				input: '',
				selected: 0,
				filteredItems: ['Test'],
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );
		const input = wrapper.find('.auto-complete-field');

		input.simulate('keydown', { key: 'Enter' });

		expect(dispatchSpy.calledWith({
			type: AC_INPUT_CHANGE,
			input: 'Test',
		}))
			.toEqual(true);

		expect(dispatchSpy.calledWith({
			type: AC_SELECT_ITEM,
			itemKey: 0,
		}))
			.toEqual(true);
	});

	it('it should dispatch on arrowup keydown', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
			},
			autocomplete: {
				input: '',
				selected: 1,
				filteredItems: ['Test', 'Test2'],
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );
		const input = wrapper.find('.auto-complete-field');

		input.simulate('keydown', { key: 'ArrowUp' });

		expect(dispatchSpy.calledWith({
			type: AC_SELECT_ITEM,
			itemKey: 0,
		}))
			.toEqual(true);
	});

	it('it should dispatch on arrowdown keydown', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
			},
			autocomplete: {
				input: '',
				selected: 0,
				filteredItems: ['Test', 'Test2'],
			},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount( <Provider store={store}><AutocompleteInput /></Provider> );
		const input = wrapper.find('.auto-complete-field');

		input.simulate('keydown', { key: 'ArrowDown' });

		expect(dispatchSpy.calledWith({
			type: AC_SELECT_ITEM,
			itemKey: 1,
		}))
			.toEqual(true);
	});
});
