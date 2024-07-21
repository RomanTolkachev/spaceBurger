import {initialState, feedTableReducer} from "./socket";
import * as actions from '../actions/socket'


describe('feed table socket reducer', () => {
    test('should test initial state', () => {
        expect(feedTableReducer(undefined, {})).toEqual(initialState)
    })
    test('should test message receiving', () => {
        let payload = {
            orders: ['order1', 'order2', 'order3'],
            totalToday: 123,
            total: 321,
        }
        expect(feedTableReducer(undefined, {type: actions.WS_GET_MESSAGE, payload}))
            .toEqual({
                ...initialState,
                ordersArray: ['order1', 'order2', 'order3'],
                total: 321,
                totalToday: 123,
            })
    })
    test('error test', () => {
        expect(feedTableReducer(undefined, {type: actions.WS_CONNECTION_ERROR}))
            .toEqual({...initialState, error: {type: 'WS_CONNECTION_ERROR'}})
    })
})
