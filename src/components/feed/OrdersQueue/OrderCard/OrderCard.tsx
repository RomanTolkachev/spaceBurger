import {FunctionComponent} from "react";
import styles from "./OrderCard.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderCard: FunctionComponent = () => {
    return (
        <li className={styles.wrapper}>
            <div className={styles.order_info}>
                <span className={styles.number}>#034525</span>
                <span className={styles.time}>Сегодня, 16:20 </span>
            </div>
            <h3 className={styles.order_name}>
                Death star Starship Burger
            </h3>
            <div className={styles.order_ingredients_thumbnails}>
                <ul>ing preview</ul>
                <span className={styles.price}>
                    <CurrencyIcon type="primary" />
                    <span>480</span>
                </span>
            </div>
        </li>
    )
}