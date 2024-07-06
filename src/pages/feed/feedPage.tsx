import {FunctionComponent, useEffect} from "react";
import styles from './feedPage.module.css'
import {OrdersQueue} from "../../components/feed/OrdersQueue/OrdersQueue";
import {OrderStatus} from "../../components/feed/OrderStatus/OrderStatus";
import {useSelector} from "react-redux";
import {IRootState} from "../../services/reducers/root-reducer";
import {PreloaderComponent} from "../../components/Preloader/PreloaderComponent";
import {useDispatchTyped} from "../../services/hooks/hooks";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/socket";

export const FeedPage: FunctionComponent = () => {

    const dispatch = useDispatchTyped()

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START})
        return () => {dispatch({type: WS_CONNECTION_CLOSED})}
    }, [dispatch])

    const orders = useSelector((state: IRootState) => state.feedTableReducer.ordersArray)

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