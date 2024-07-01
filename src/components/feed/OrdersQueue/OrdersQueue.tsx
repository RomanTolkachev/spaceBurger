import {FunctionComponent} from "react";
import {OrderCard} from "./OrderCard/OrderCard";
import styles from "./OrderQueue.module.css"
import {useSelector} from "react-redux";
import {IRootState} from "../../../services/reducers/root-reducer";
import {useMatch} from "react-router-dom";


export const OrdersQueue: FunctionComponent = () => {

    const orders = useSelector((state: IRootState) => state.feedTableReducer.ordersArray)

    const matchFeed = useMatch('/feed')

    return matchFeed ? (
        <ul className={styles.main}>
            {orders && orders.map((item, index: number) => (<OrderCard key={index} data={item}/>))}
        </ul>
    ) : null
}