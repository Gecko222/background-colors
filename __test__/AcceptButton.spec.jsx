import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import AcceptButton from '../src/components/accept-button/accept-button.component';

describe('>>>AcceptButton --- Snapshot', () => {
	const initialState = {
		appState: {
			fetched: false,
			fetchError: false,
			colors: [],
		},
		autocomplete: {},
	};
	const mockStore = configureStore();

	it('+++capturing Snapshot of AcceptButton', () => {
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><AcceptButton /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>>AcceptButton', () => {
	const mockStore = configureStore();

	it('it should change body background color', () => {
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
		const wrapper = mount( <Provider store={store}><AcceptButton /></Provider> );

		wrapper.find('.accept-button').simulate('click');

		expect(document.getElementsByTagName('body')[0].style.backgroundColor)
		.toBe('rgba(255, 255, 255, 0.5)');
	});

	it('it shouldn\'t change body background color', () => {
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [{
					name: 'Test',
					hex: '000',
				}],
			},
			autocomplete: {
				input: 'DifrentTest',
			},
		};
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><AcceptButton /></Provider> );

		wrapper.find('.accept-button').simulate('click');

		expect(document.getElementsByTagName('body')[0].style.backgroundColor)
		.toBe('rgba(255, 255, 255, 0.5)');
	});
});
