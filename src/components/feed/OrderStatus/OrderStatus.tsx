import styles from './OrderStatus.module.css'
import {FunctionComponent, useMemo} from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../../services/reducers/root-reducer";
import {IOrder} from "../../../services/reducers/socket";

export const OrderStatus: FunctionComponent = () => {

    const orders = useSelector((state: IRootState) => state.feedTableReducer.ordersArray);
    const {total, totalToday} = useSelector((state: IRootState) => state.feedTableReducer)

    const readyOrders = useMemo<IOrder[] | null>(() => {
        const getReadyOrders = (): null | IOrder[] => {
            if (orders) {
                let result = orders.filter(item => item.status === 'done').slice(0,15)
                return result.length === 0 ? null : result
            } else return null
        }
        return getReadyOrders()
    }, [orders])

    const ordersInProcess = useMemo<IOrder[] | null>(() => {
        const getOrdersInProcess = (): null | IOrder[] => {
            if (orders) {
                let result = orders.filter(item => item.status !== 'done').slice(0,15)
                return result.length === 0 ? null : result
            } else return null
        }
        return getOrdersInProcess();
    },[orders] )

    const columns = readyOrders && Math.ceil(Math.max(readyOrders!.length/5, 1))
    const inProcessColumns = ordersInProcess && Math.ceil(Math.max(ordersInProcess!.length/5, 1))

    return (
        (
            <section className={styles.wrapper}>
                <div className={styles.statuses}>
                    <div>
                        <h2 className={styles.list_header}>готовы:</h2>
                        <ul className={styles.list_done} style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
                            {readyOrders ?
                                readyOrders.map((item, index) => {
                                    return <li key={index}>
                                        {item.number}
                                    </li>
                                }) :
                                <li className={styles.list_info}>готовых заказов нет</li>
                            }
                        </ul>
                    </div>
                    <div>
                        <h2 className={styles.list_header}>в работе:</h2>
                        <ul className={styles.list} style={{gridTemplateColumns: `repeat(${inProcessColumns}, 1fr)`}}>
                            {ordersInProcess ?
                                ordersInProcess.map((item, index) => {
                                    return <li key={index}>
                                        {item.number}
                                    </li>
                                }) :
                                <li className={styles.list_info}>готовящихся заказов нет</li>
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className={styles.done_header}>выполнено за все время:</h2>
                    <div className={styles.done_total}>{total}</div>
                </div>
                <div>
                    <h2 className={styles.done_header}>выполнено за сегодня:</h2>
                    <div className={styles.done_total}>{totalToday}</div>
                </div>
            </section>
        )
    )
}