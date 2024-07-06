import {FunctionComponent, useEffect} from "react";
import {OrderCard} from "./OrderCard/OrderCard";
import styles from "./OrderQueue.module.css"
import {useSelector} from "react-redux";
import {IRootState} from "../../../services/reducers/root-reducer";
import {PathMatch, useMatch} from "react-router-dom";
import {useDispatchTyped} from "../../../services/hooks/hooks";
import {
    WS_OWN_ORDERS_CONNECTION_CLOSED,
    WS_OWN_ORDERS_CONNECTION_START
} from "../../../services/actions/ownOrdersSocket";


export const OrdersQueue: FunctionComponent = () => {

    const dispatch = useDispatchTyped()
    const orders = useSelector((state: IRootState) => state.feedTableReducer.ordersArray)
    const personalOrders = useSelector((state: IRootState) => state.personalOrdersReducer.ordersArray)
    const matchFeed: PathMatch | null = useMatch('/feed')

    useEffect(() => {
        if (!matchFeed) {
            dispatch({type: WS_OWN_ORDERS_CONNECTION_START})
        }
        return () => {
            dispatch({type:WS_OWN_ORDERS_CONNECTION_CLOSED})
        }
    },[dispatch, matchFeed])

    return (matchFeed ?
        <ul className={styles.main}>
            {orders && orders.map((item, index: number) => (<OrderCard key={index} data={item}/>))}
        </ul>
     :      <ul className={styles.main}>
            {personalOrders && personalOrders.map((item, index: number) => (<OrderCard key={index} data={item}/>))}
        </ul>)
}