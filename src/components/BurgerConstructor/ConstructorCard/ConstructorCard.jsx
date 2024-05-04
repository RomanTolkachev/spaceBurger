import styles from './ConstructorCard.module.css'
import {CurrencyIcon, DeleteIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const ConstructorCard = (props) => {
    return(
        <div className={styles.wrapper}>
        <div className={styles.drag_icon}>
            <DragIcon type="primary" />
        </div>
        <div className={styles.card}>
            <img src={props.ingredientData.image_mobile} alt="картинка"/>
            <h4>{props.ingredientData.name}</h4>
            <p className={styles.price}> <CurrencyIcon type="primary" />{props.ingredientData.price}</p>
            <DeleteIcon type="primary" />
        </div>
        </div>
    )
}

export default ConstructorCard