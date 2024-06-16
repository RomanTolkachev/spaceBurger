import styles from './EmptyCard.module.css'
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {PropsWithChildren} from "react";

interface IEmptyCardProps {
    type: 'top' | 'bottom' | 'middle'
}


export const EmptyCard: React.FunctionComponent<PropsWithChildren<IEmptyCardProps>> = ({children, type}) => {
    return(
        <li className={styles.wrapper} >
            { !type &&
                <p>
                    <DragIcon type="secondary"/>
                </p>
            }
            <div className={styles.content}
                 style={{
                     borderRadius: type === "top"
                ? "88px 88px 40px 40px"
                : type === "bottom"
                ? "40px 40px 88px 88px"
                : ""}}>
            <div className={styles.text}>
                <span>{children}</span>
            </div>
        </div>
        </li>
    )
}
