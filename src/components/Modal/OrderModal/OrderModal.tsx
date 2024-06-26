import React, {PropsWithChildren} from "react";
import styles from './OrderModal.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderModal:React.FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.order_number}>
                {children}
            </div>
            <h4 className={styles.header}>идентиифкатор заказа</h4>
            <div className={styles.mark_box}>
                <CheckMarkIcon type="primary"/>
            </div>
            <span className={styles.started}>{"ваш заказ начали готовить"}</span>
            <span className={styles.please_wait}>{"дождитесь готовности на орбитальной станции"}</span>
        </div>
    )
};

export default OrderModal;