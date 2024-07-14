import {IOrder} from "../reducers/socket";

export const GET_DETAILED_ORDER_INFO: 'GET_DETAILED_ORDER_INFO' = 'GET_DETAILED_ORDER_INFO';
export const CLEAR_DETAILED_ORDER_INFO: 'CLEAR_DETAILED_ORDER_INFO' = 'CLEAR_DETAILED_ORDER_INFO'

interface IConfigureInfo {
    type: typeof GET_DETAILED_ORDER_INFO
    info: IOrder
}

export interface IClearInfo {
    type: typeof CLEAR_DETAILED_ORDER_INFO
}

export type TOrderInfoActions = IConfigureInfo | IClearInfo

export const configureOrderDetailedInfo = (info: IOrder ): TOrderInfoActions => {
    return {
        type: GET_DETAILED_ORDER_INFO,
        info: info
    }
}

export const clearOrderDetailedInfo = (): TOrderInfoActions => {
    return {
        type: CLEAR_DETAILED_ORDER_INFO,
    }
}