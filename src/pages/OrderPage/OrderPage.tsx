import styles from './OrderPage.module.css'
import React from "react";
import {DetailedOrderInfo} from "../../components/Modal/DetailedOrderInfo/DetailedOrderInfo";
export const OrderPage: React.FunctionComponent = () => {
    return (
        <section className={styles.frame}>
            <DetailedOrderInfo />
        </section>
    )
}