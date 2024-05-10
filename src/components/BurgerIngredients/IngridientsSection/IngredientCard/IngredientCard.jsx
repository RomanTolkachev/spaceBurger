import styles from './IngredientCard.module.css'
import React from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {configureDetailedInfo} from "../../../../services/actions/ingredientDetailedInfo";

const IngredientCard = (props) => {

    const dispatch = useDispatch();

    return (
        <>
            <li className={`${styles.card}`} onClick={() => dispatch(configureDetailedInfo(props.burgerData))}>
                <Counter  count={1} size="default" extraClass="m-1" style={{position: 'absolute'}}/>
                <div className={`${styles.card_image_wrapper} mb-1`}>
                    <img className={styles.card_image} src={props.burgerData.image} alt="картинка"/>
                </div>
                <p className={`${styles.price} mb-1`}><CurrencyIcon type="primary"/>{props.burgerData.price}</p>
                <h3 className={`${styles.name} text text_type_main-small pb-6`}>{props.burgerData.name}</h3>
            </li>
        </>
    )
}

export default IngredientCard;