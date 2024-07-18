import {initialState, userInfo} from "./user";
import * as actions from "../actions/user"

describe('user reducers common tests', () => {
    test("initial state test", () => {
        expect(userInfo(undefined, {})).toEqual(initialState)
    })
    test('should test set user', () => {
        let data = {email: 'email@email', name: "Vasya"};
        expect(userInfo(undefined, {type: actions.SET_USER, data})).toEqual({...initialState, email: 'email@email', name: "Vasya"})
    })
    test('should clear user', () => {
        expect(userInfo({someData:'data'},{type: actions.CLEAR_USER})).toEqual({...initialState, isAuthChecked: true})
    })
    test('set auth checked', () => {
        let newState = userInfo(undefined, {type: actions.AUTH_STATUS_CHECKED});
        expect(newState.isAuthChecked).toBeTruthy()
    })
    test('should test sending email start', () => {
        expect(userInfo(undefined, {type: actions.SEND_EMAIL_START})).toEqual({...initialState, isRequestButtonLocked: true})
    })
    test('should test sending email finished', () => {
        expect(userInfo(undefined, {type: actions.SEND_EMAIL_FINISHED})).toEqual({...initialState, isRequestButtonLocked: false})
    })
})