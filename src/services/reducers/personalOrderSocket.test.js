import {initialState, personalOrdersReducer} from "./PersonalOrdersSocket";
import * as actions from "../actions/PersonalOrdersSocket"

describe('order socket reducer tests', () => {
    test('initial state test', () => {
        expect(personalOrdersReducer(undefined, {})).toEqual(initialState)
    })
    test('message receiving test', () => {
        let payload = {
            orders: ['order1', 'order2', 'order3'],
            totalToday: 123,
            total: 321,
        }
        expect(personalOrdersReducer(undefined, {type: actions.WS_PERSONAL_ORDERS_GET_MESSAGE, payload}))
            .toEqual({
                ...initialState,
                ordersArray: ['order1', 'order2', 'order3'],
                total: 321,
                totalToday: 123,
            })
    })
    test('error test', () => {
        expect(personalOrdersReducer(undefined, {type: actions.WS_PERSONAL_ORDERS_CONNECTION_ERROR}))
            .toEqual({...initialState, error: {type: 'WS_PERSONAL_ORDERS_CONNECTION_ERROR'}})
    })
})
