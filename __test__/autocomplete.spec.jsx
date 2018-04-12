import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

import AutocompleteConnected, { Autocomplete }
from '../src/components/autocomplete/autocomplete.component';
import {
	AC_SET_ITEMS,
	AC_SET_FILTERED_ITEMS,
} from '../src/actions/action-types';
import {
	setItems,
	setFilteredItems,
	selectItem,
} from '../src/actions/autocomplete.action';

describe('>>>Autocomplete --- Snapshot', () => {
	const initialState = {
		autocomplete: {},
	};
	const mockStore = configureStore();

	it('+++capturing Snapshot of AutocompleteInput', () => {
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><AutocompleteConnected /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>>Autocomplete', () => {
	const mockStore = configureStore();
	const items = ['Test', 'Test2'];
	const items2 = ['Test'];

	it('it should dispatch after mount', () => {
		const initialState = {
			autocomplete: {},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		mount( <Provider store={store}><AutocompleteConnected items={items} /></Provider> );

		expect(dispatchSpy.calledWith({
			type: AC_SET_ITEMS,
			items,
		}))
			.toEqual(true);

		expect(dispatchSpy.calledWith({
			type: AC_SET_FILTERED_ITEMS,
			filteredItems: items,
		}))
			.toEqual(true);
	});

	it('it should dispatch after update', () => {
		const initialState = {
			autocomplete: {},
		};

		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = shallow(
			<Autocomplete
				items={items}
				setItems={(...args) => store.dispatch(setItems(...args))}
				setFilteredItems={(...args) => store.dispatch(setFilteredItems(...args))}
				selectItem={(...args) => store.dispatch(selectItem(...args))}
			/>
		);

		wrapper.setProps({
			items: items2,
		});

		expect(dispatchSpy.calledWith({
			type: AC_SET_ITEMS,
			items: items2,
		}))
			.toEqual(true);
	});
});
