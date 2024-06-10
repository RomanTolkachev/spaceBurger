import styles from './EmptyCard.module.css'
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const EmptyCard = (props) => {
    return(
        <li className={styles.wrapper} >
            { !props.type &&
                <p>
                    <DragIcon type="secondary"/>
                </p>
            }
            <div className={styles.content}
                 style={{
                     borderRadius: props.type === "top"
                ? "88px 88px 40px 40px"
                : props.type === "bottom"
                ? "40px 40px 88px 88px"
                : ""}}>
            <div className={styles.text}>
                <span>{props.children}</span>
            </div>
        </div>
        </li>
    )
}

EmptyCard.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
}
