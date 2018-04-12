import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

import AutocompleteSuggestedListConnected, { AutocompleteSuggestedList }
from '../src/components/autocomplete/autocomplete-suggested-list.component';
import {
	AC_SELECT_ITEM,
	AC_CLICK_ITEM,
} from '../src/actions/action-types';
import {
	selectItem,
	clickItem,
} from '../src/actions/autocomplete.action';

describe('>>>AutocompleteSuggestedList --- Snapshot', () => {
	const mockStore = configureStore();

	it('+++capturing Snapshot of AutocompleteSuggestedList', () => {
		const initialState = {
			autocomplete: {},
		};
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><AutocompleteSuggestedListConnected /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	it('+++capturing Snapshot of AutocompleteSuggestedList on focus', () => {
		const initialState = {
			autocomplete: {
				filteredItems: ['Test', 'Test2'],
				focus: true,
			},
		};
		const store = mockStore(initialState);
		const wrapper = mount( <Provider store={store}><AutocompleteSuggestedListConnected /></Provider> );

		const renderedValue = renderer.create(wrapper).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});
});

describe('>>>Autocomplete', () => {
	const mockStore = configureStore();
	const items = ['Test', 'Test2'];
	const items2 = ['Test'];
	const store = mockStore({
		autocomplete: {},
	});
	const wrapper = shallow(
		<AutocompleteSuggestedList
			filteredItems={items}
			selected={1}
			selectItem={(...args) => store.dispatch(selectItem(...args))}
			clickItem={(...args) => store.dispatch(clickItem(...args))}
		/>
	);

	it('it should return items', () => {
		const items = wrapper.instance()._getItems();

		expect(items.length).toBe(2);

	});

	it('it should update', () => {
		const didUpdateSpy = sinon.spy(wrapper.instance(), 'componentDidUpdate');

		wrapper.setProps({
			items: items2,
		});

		expect(didUpdateSpy.called).toBe(true);
	});
});

describe('>>>Autocomplete --- connected', () => {
	const mockStore = configureStore();
	const items = ['Test', 'Test2'];

	it('it should dispatch on mouse enter', () => {
		const store = mockStore({
			autocomplete: {
				filteredItems: items,
				focus: true,
			},
		});
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount(
			<Provider store={store}>
				<AutocompleteSuggestedListConnected/>
			</Provider>
		);
		const itemsList = wrapper.find('.auto-complete-item');
		const item1 = itemsList.at(0);
		const item2 = itemsList.at(1);

		wrapper.setProps({
			itemsRefs: {
				[item1.instance().textContent]: item1,
				[item2.instance().textContent]: item2,
			},
		});

		item2.simulate('mouseEnter');

		expect(dispatchSpy.calledWith({
			type: 'AC_SELECT_ITEM',
			itemKey: 1,
		}))
			.toEqual(true);
	});

	it('it should dispatch on mouse down', () => {
		const store = mockStore({
			autocomplete: {
				filteredItems: items,
				focus: true,
			},
		});
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const wrapper = mount(
			<Provider store={store}>
				<AutocompleteSuggestedListConnected/>
			</Provider>
		);
		const itemsList = wrapper.find('.auto-complete-item');
		const item1 = itemsList.at(0);
		const item2 = itemsList.at(1);

		wrapper.setProps({
			itemsRefs: {
				[item1.instance().textContent]: item1,
				[item2.instance().textContent]: item2,
			},
		});

		item1.simulate('mouseDown');
		expect(dispatchSpy.calledWith({
			type: 'AC_CLICK_ITEM',
			input: item1.instance().textContent,
		}))
			.toEqual(true);
	});
});

