import {burgerConstructor}  from "./burgerCounstructor";
import initialState from './burgerCounstructor';
import {HANDLE_CLEAR_CART, HANDLE_DELETE, HANDLE_DROP, HANDLE_SWAP_CARD} from "../actions/burgerCounstructor";
import * as actionCreators from '../actions/burgerCounstructor'
import uuid from "react-uuid";

    const bunExample = {
        _id:"643d69a5c3f7b9001cfa093d",
            name:"Флюоресцентная булка R2-D3",
        type:"bun",
        proteins:44,
        fat:26,
        carbohydrates:85,
        calories:643,
        price:988,
        image:"https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v:0,
        dynamicId:"1e64a33f-9317-6cad-410a-de4fa2ac9545",
    }
     const fillingExample = {
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
        dynamicId:"d0cd1ac7-faf8-9b76-cf50-2782dddabfb9",
    }
    const anotherFillingExample = {
        ...fillingExample,
        dynamicId:"123aaa",
    }
    const filledState = {
        bun: [bunExample, bunExample],
        filling: [fillingExample, anotherFillingExample]
    }

describe("common test for burgerConstructor", () => {
    describe("BurgerConstructor reducers test", () => {
        it("should run the initial state", () => {
            expect(burgerConstructor(undefined, {})).toEqual(initialState)
        })
        it("should test handle bun drop", () => {
            let droppableBunItem = bunExample
            expect(burgerConstructor(undefined, {type: HANDLE_DROP, droppableItem: droppableBunItem}))
                .toEqual({...initialState, bun: [droppableBunItem, droppableBunItem]})
        })
        it("should test handle filling drop", () => {
            let droppableFillingItem  = fillingExample
            expect(burgerConstructor(undefined, {type: HANDLE_DROP, droppableItem: droppableFillingItem}))
                .toEqual({...initialState, filling: [droppableFillingItem]})
        })
        it("should test delete item", () => {
            let deletableItemId  = "d0cd1ac7-faf8-9b76-cf50-2782dddabfb9"
            expect(burgerConstructor(filledState, {type: HANDLE_DELETE, deletableItemId: deletableItemId}))
                .toEqual({...filledState, filling: filledState.filling.filter(item => item.dynamicId !== deletableItemId)})
        })
        it("should test swap item", () => {
            let dragIndex  = 1;
            let hoverIndex  = 0;
            expect(burgerConstructor(filledState, {type: HANDLE_SWAP_CARD, dragIndex, hoverIndex}))
                .toEqual({...filledState, filling: [anotherFillingExample, fillingExample]})
        })
        it("should clear cart", () => {
            expect(burgerConstructor(filledState, {type: HANDLE_CLEAR_CART}))
                .toEqual({...initialState})
        })
    })
    describe("Action creators for burgerConstructor", () => {
        it("should test handleDrop func", () => {
            const dynamicId = uuid();
            let expectedAction = {
                type: HANDLE_DROP,
                droppableItem: {...fillingExample, dynamicId: dynamicId}
            }
            let memoisedHandleDrop = actionCreators.handleDrop(fillingExample) // внутри handleDrop идет присвоение dynamicID, чтобы проверка прошла, нужно запомнить этот ID
            memoisedHandleDrop.droppableItem.dynamicId = dynamicId
            expect(memoisedHandleDrop).toEqual(expectedAction)
        })
        it("should test handleDelete", () => {
            let idToDelete = "d0cd1ac7-faf8-9b76-cf50-2782dddabfb9"
            let expectedAction = {
                type: HANDLE_DELETE,
                deletableItemId: idToDelete
            }
            expect(actionCreators.handleDelete(idToDelete)).toEqual(expectedAction)
        })
        it("should test handleSwap", () => {
            let drag = 1
            let drop = 0
            let expectedAction = {
                type: HANDLE_SWAP_CARD,
                dragIndex: drag,
                hoverIndex: drop
            }
            expect(actionCreators.handleSwap(drag, drop)).toEqual(expectedAction)
        })
        it("should test handleClearCart", () => {
            let expectedAction = {
                type: HANDLE_CLEAR_CART,
            }
            expect(actionCreators.handleClearCart()).toEqual(expectedAction)
        })
    })
})




