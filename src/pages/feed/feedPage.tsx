import {FunctionComponent, useEffect} from "react";
import styles from './feedPage.module.css'
import {OrdersQueue} from "../../components/feed/OrdersQueue/OrdersQueue";
import {OrderStatus} from "../../components/feed/OrderStatus/OrderStatus";
import {PreloaderComponent} from "../../components/Preloader/PreloaderComponent";
import {useDispatchTyped, useSelectorTyped} from "../../services/hooks/hooks";
import { WSFeedStart, WSStartDisconnect} from "../../services/actions/socket";
const socketURL: 'wss://norma.nomoreparties.space/orders/all' = 'wss://norma.nomoreparties.space/orders/all'

export const FeedPage: FunctionComponent = () => {

    const dispatch = useDispatchTyped()

    useEffect(() => {
        dispatch(WSFeedStart(socketURL))
        return () => {dispatch(WSStartDisconnect())}
    }, [dispatch])

    const orders = useSelectorTyped((state) => state.feedTableReducer.ordersArray)

    return (orders ?
            <section className={styles.wrapper}>
                <div className={styles.header_plug}></div>
                <h1 className={styles.section_header}>лента заказов</h1>
                <div className={styles.main}>
                    <OrdersQueue></OrdersQueue>
                    <OrderStatus></OrderStatus>
                </div>
            </section> :
            <div className={styles.wrapper_preloader}>
                <PreloaderComponent/>
            </div>
    )
}