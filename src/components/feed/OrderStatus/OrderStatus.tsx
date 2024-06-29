import styles from './OrderStatus.module.css'
import {FunctionComponent} from "react";

export const OrderStatus: FunctionComponent = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.statuses}>
                <div>
                    <h2 className={styles.list_header}>готовы:</h2>
                    <ul className={styles.list_done}>
                        <li>222222</li>
                        <li>333333</li>
                        <li>444444</li>
                    </ul>
                </div>
                <div>
                    <h2 className={styles.list_header}>в работе:</h2>
                    <ul className={styles.list}>
                        <li>777777</li>
                        <li>888888</li>
                        <li>999999</li>
                        <li>555555</li>
                        <li>666666</li>
                    </ul>
                </div>
            </div>
            <div>
                <h2 className={styles.done_header}>выполнено за все время:</h2>
                <div className={styles.done_total}>28752</div>
            </div>
            <div>
                <h2 className={styles.done_header}>выполнено за сегодня:</h2>
                <div className={styles.done_total}>138</div>
            </div>
        </section>
    )
}