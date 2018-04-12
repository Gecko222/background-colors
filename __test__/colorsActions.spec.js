import configureStore from 'redux-mock-store';
import sinon from 'sinon';

global.fetch = require('jest-fetch-mock');

import { fetchColors } from '../src/actions/colors.action';
import { COLOR_FETCH_SUCCESS, COLOR_FETCH_FAIL } from '../src/actions/action-types';


describe('>>>ACTION --- colors', () => {
		const mockStore = configureStore();
		const initialState = {
			appState: {
				fetched: false,
				fetchError: false,
				colors: [],
			},
			autocomplete: {},
		};
		const store = mockStore(initialState);
		const dispatchSpy = sinon.spy(store, 'dispatch');
		const colors = [
			{
				name: 'aliceblue',
				hex: 'f0f8ff',
			},
			{
				name: 'antiquewhite',
				hex: 'faebd7',
			},
		];

	it('+++ fetchColors success', done => {
		fetch.mockResponseOnce(JSON.stringify(colors));

		fetchColors(e => store.dispatch(e))
			.then(results => {
				expect(dispatchSpy.calledWith({
					type: COLOR_FETCH_SUCCESS,
					colors,
				}))
					.toEqual(true);

				done();
			});
	});

	it('+++ fetchColors fail', done => {
		fetch.mockRejectOnce();

		fetchColors(store.dispatch)
			.then(results => {
				expect(dispatchSpy.calledWith({
					type: COLOR_FETCH_FAIL,
				}))
					.toEqual(true);

				done();
			});
	});
});
