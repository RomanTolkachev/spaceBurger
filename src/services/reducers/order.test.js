import initialState, {orderStore} from "./order";
import * as actions from '../actions/order'

describe('tests for orders', () => {
    test('should test initial state', () => {
        expect(orderStore(undefined, {})).toEqual(initialState)
    })
    test("should test sending order", () => {
        let result = {
            isOrderButtonLocked: true,
            isOrderSuccess: null
        }
        expect(orderStore(undefined, {type: actions.ORDER_SENT}))
            .toEqual({...initialState, ...result})
    })
    test('should test order success', () => {
        let order = {someInfo: 'someInfo'}
        expect(orderStore(undefined, {type: actions.ORDER_SENT_SUCCESS, orderInfo: order, orderNumber: 123}))
            .toEqual({...initialState, isOrderSuccess: true, orders: [order], modalContent: 123})
    })
    test ('should test order sent failed', () => {
        expect(orderStore(undefined, {type: actions.ORDER_SENT_FAILED}))
            .toEqual({...initialState, isOrderSuccess: false})
    })
    test('should test order processing finished', () => {
        let newState = orderStore(undefined, {type: actions.ORDER_PROCESSING_FINISHED})
        expect(newState.isOrderButtonLocked).toBeFalsy()
    })
    test('should test clear order number', () => {
        expect(orderStore(undefined, {type:actions.CLEAR_ORDER_NUMBER}))
            .toEqual(initialState)
    })
})