import initialState, { burgerIngredients } from "./burgerIngredients";
import * as actions from "../actions/burgerIngredients";
import fetchMock from "fetch-mock";
import thunk from 'redux-thunk';
import configureMockStore from "redux-mock-store";
import {fetchIngredients} from "../../utils/api";


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const ingredientExample = {
    _id:"643d69a5c3f7b9001cfa0943",
    name:"Соус фирменный Space Sauce",
    type:"sauce",
    proteins:50,
    fat:22,
    carbohydrates:11,
    calories:14,
    price:80,
    image:"https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile:"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v:0,
}

describe("common tests for burgerIngredients",  () => {
    it('should run initial burger ingredients store', () => {
        expect(burgerIngredients(undefined, {})).toEqual(initialState)
    })

    describe("test for reducers in burgerIngredients", () => {
        it("should test start fetch reducer", () => {
            expect(burgerIngredients(undefined, {type: actions.FETCH_INGREDIENTS})).toEqual({...initialState, isLoading: true, hasError: false})
        })
        it("should test fetch success reducer", () => {
            const fetchedArray = [ingredientExample,ingredientExample]
            expect(burgerIngredients(undefined, {type: actions.FETCH_INGREDIENTS_SUCCESS, data: fetchedArray})).toEqual({...initialState, isLoading: false, hasError: false, ingredients: fetchedArray})
        })
        it("should test fetch failed reducer", () => {
            const error = "no way"
            expect(burgerIngredients(undefined, {type: actions.FETCH_INGREDIENTS_FAILED, error })).toEqual({...initialState, isLoading: false, hasError: true, errorMessage: error})
        })
        it("should test switch tab", () => {
            const current = "sauce"
            expect(burgerIngredients(undefined, {type: actions.SWITCH_TAB, current })).toEqual({...initialState, isLoading: false, hasError: false, currentTab: current})
        })
    })

    describe("action creator for burgerIngredients", () => {
        it("should test set current tab action creator", () => {
            const current = "sauce"
            let expectedAction = {
                type: actions.SWITCH_TAB,
                current: current
            }
            expect(actions.setCurrentTab(current)).toEqual(expectedAction)
        })
        it("should test failed fetch action creator", () => {
            const errorMessage = "404"
            let expectedAction = {
                type: actions.FETCH_INGREDIENTS_FAILED,
                error: errorMessage
            }
            expect(actions.handleFailedFetch()).toEqual(expectedAction)
        })
        it("should test start fetch action creator", () => {
            let expectedAction = {
                type: actions.FETCH_INGREDIENTS,
            }
            expect(actions.startFetch()).toEqual(expectedAction)
        })
        it("should test set ingredients action creator", () => {
            let parsedArray = [ingredientExample, ingredientExample]
            let expectedAction = {
                type: actions.FETCH_INGREDIENTS_SUCCESS,
                data: parsedArray
            }
            expect(actions.setIngredients(parsedArray)).toEqual(expectedAction)
        })
        it("tests async fetch thunk", () => {
            afterEach(() => {
                fetchMock.restore()
            })


            afterAll(() => {
                jest.resetAllMocks()
            })
        })
    })

    describe('test fetch ingredients', () => {
        beforeEach(() => {
            jest.spyOn(require('../../utils/api'), 'fetchIngredients').mockResolvedValue({
                success: true,
                data: {result: "ok"}
            })
        })
        afterAll(() => {
            jest.resetAllMocks()
        })
        test('fetch ingredients async function test', () => {
            let fetched;
            return fetchIngredients()
            .then(res => {
                fetched = res;
                expect(fetched).toEqual({success: true, data: {result: 'ok'}})
                expect(fetchIngredients).toHaveBeenCalledTimes(1)
            })
        });
        test('should pass if fetchIngredients is rejected', () => {
            fetchIngredients.mockReturnValue(Promise.reject({ success: false }))
            let rejected;
            return fetchIngredients()
                .catch(err => {
                    rejected = err;
                    expect(rejected).toEqual({success: false})
                })
        })
    })
})