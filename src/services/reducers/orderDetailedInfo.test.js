import {initialState, detailedOrderInfo} from "./orderDetailedInfo";
import * as actions from "../actions/orderDetailedInfo"

describe('order detailed info tets', () => {
    test('should test initial state', () => {
        expect(detailedOrderInfo(undefined, {})).toEqual(initialState)
    })
    test('should test obtaining detailed info about order', () => {
        expect(detailedOrderInfo(undefined, {type: actions.GET_DETAILED_ORDER_INFO, info: {ingredient: 'someInfo'}}))
            .toEqual({...initialState, info: {ingredient: 'someInfo'}})
    })
    test('should clear detailed info', () => {
        expect(detailedOrderInfo({prevstate: 'someInfo'}, {type: actions.CLEAR_DETAILED_ORDER_INFO})).toEqual(initialState)
    })
})