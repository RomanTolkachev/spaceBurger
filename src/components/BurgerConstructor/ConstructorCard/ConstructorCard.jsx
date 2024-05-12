import styles from './ConstructorCard.module.css'
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const ConstructorCard = (props) => {
    return(
        <li className={styles.wrapper}>
        <p>
            <DragIcon style={{display: 'none'}} type="secondary" />
        </p>
        <div className={styles.content}>
            <div className={styles.text}>
                <span>{props.children}</span>
            </div>
        </div>
        </li>
    )
}
