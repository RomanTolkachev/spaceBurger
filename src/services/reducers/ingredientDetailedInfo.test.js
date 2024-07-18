import initialState, {ingredientDetailedInfo} from "./ingredientDetailedInfo";
import * as actions from '../actions/ingredientDetailedInfo'

describe('tests for ingredientDetailedInfo', () => {
    test('should test initial ingredientDetailedInfo', () => {
        expect(ingredientDetailedInfo(undefined, {})).toEqual(initialState)
    })
    test('should test get detailed info', () => {
        const someInfo = {ingredient: 'someInfo'}
        expect(ingredientDetailedInfo(undefined, {type: actions.GET_DETAILED_INGREDIENT_INFO, info: someInfo}))
            .toEqual({...initialState, info: someInfo})
    })
    test('should test clear detailed info', () => {
        expect(ingredientDetailedInfo(undefined, {type: actions.CLEAR_DETAILED_INGREDIENT_INFO}))
            .toEqual({...initialState})
    })
})