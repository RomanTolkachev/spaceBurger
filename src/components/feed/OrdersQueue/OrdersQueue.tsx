import {FunctionComponent} from "react";
import {OrderCard} from "./OrderCard/OrderCard";
import styles from "./OrderQueue.module.css"

export const OrdersQueue: FunctionComponent = () => {
    return <ul className={styles.main}>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
        <OrderCard/>
    </ul>
}