import {CLEAR_DETAILED_ORDER_INFO, GET_DETAILED_ORDER_INFO, TOrderInfoActions} from "../actions/orderDetailedInfo";
import {IOrder} from "./socket";


export interface IDetailedOrderInfo {
    info: IOrder | null
}

export const initialState: IDetailedOrderInfo = {info: null};

export const detailedOrderInfo = (state: IDetailedOrderInfo = initialState, action: TOrderInfoActions): IDetailedOrderInfo => {
    switch (action.type) {
        case GET_DETAILED_ORDER_INFO: {
            return {
                ...state,
                info: action.info,
            }
        }
        case CLEAR_DETAILED_ORDER_INFO: {
            return initialState
        }
        default: {
            return state
        }
    }
}
