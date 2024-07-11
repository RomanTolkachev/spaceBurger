import {FunctionComponent, useEffect} from "react";
import {OrderCard} from "./OrderCard/OrderCard";
import styles from "./OrderQueue.module.css"
import {PathMatch, useMatch} from "react-router-dom";
import {useDispatchTyped, useSelectorTyped} from "../../../services/hooks/hooks";
import {PreloaderComponent} from "../../Preloader/PreloaderComponent";
import {
    WSPersonalOrdersFeedStart,
    WSPersonalOrdersStartDisconnect
} from "../../../services/actions/PersonalOrdersSocket";
const wsPersonalOrdersURL: 'wss://norma.nomoreparties.space/orders' = 'wss://norma.nomoreparties.space/orders'

export const OrdersQueue: FunctionComponent = () => {

    const dispatch = useDispatchTyped()
    const orders = useSelectorTyped((state) => state.feedTableReducer.ordersArray)
    const personalOrders = useSelectorTyped((state) => state.personalOrdersReducer.ordersArray)
    const matchFeed: PathMatch | null = useMatch('/feed')

    useEffect(() => {
        if (!matchFeed) {
            dispatch(WSPersonalOrdersFeedStart(`${wsPersonalOrdersURL}?token=${localStorage.getItem("accessToken")}`))
            return () => {
                dispatch(WSPersonalOrdersStartDisconnect())
            }
        }
    },[dispatch, matchFeed])

    return personalOrders || orders ? (
        <ul className={styles.main}>
            { matchFeed
                ? orders && orders!.map((item, index: number) => (<OrderCard key={index} data={item}/>))
                : personalOrders && personalOrders!.map((item, index: number) => (<OrderCard key={index} data={item}/>))
            }
        </ul> ) : <PreloaderComponent/>
}