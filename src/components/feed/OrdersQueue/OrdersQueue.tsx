import {FunctionComponent, useEffect} from "react";
import {OrderCard} from "./OrderCard/OrderCard";
import styles from "./OrderQueue.module.css"
import {useSelector} from "react-redux";
import {IRootState} from "../../../services/reducers/root-reducer";
import {PathMatch, useMatch} from "react-router-dom";
import {useDispatchTyped} from "../../../services/hooks/hooks";
import {PreloaderComponent} from "../../Preloader/PreloaderComponent";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../../services/actions/socket";
const wsPersonalOrdersURL: 'wss://norma.nomoreparties.space/orders' = 'wss://norma.nomoreparties.space/orders'

export const OrdersQueue: FunctionComponent = () => {

    const dispatch = useDispatchTyped()
    const orders = useSelector((state: IRootState) => state.feedTableReducer.ordersArray)
    const personalOrders = useSelector((state: IRootState) => state.personalOrdersReducer.ordersArray)
    const matchFeed: PathMatch | null = useMatch('/feed')

    useEffect(() => {
        if (!matchFeed) {
            dispatch({type: WS_CONNECTION_START, payload: `${wsPersonalOrdersURL}?token=${localStorage.getItem("accessToken")}`})
            return () => {
                dispatch({type:WS_CONNECTION_CLOSED})
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