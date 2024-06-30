import {FunctionComponent} from "react";
import styles from './feedPage.module.css'
import {OrdersQueue} from "../../components/feed/OrdersQueue/OrdersQueue";
import {OrderStatus} from "../../components/feed/OrderStatus/OrderStatus";
import {useSelector} from "react-redux";
import {IRootState} from "../../services/reducers/root-reducer";

export const FeedPage: FunctionComponent = () => {


    return <section className={styles.wrapper}>
        <div className={styles.header_plug}></div>
        <h1 className={styles.section_header}>лента заказов</h1>
        <div className={styles.main}>
            <OrdersQueue></OrdersQueue>
            <OrderStatus></OrderStatus>
        </div>
    </section>
}