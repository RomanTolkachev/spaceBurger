import styles from './IngredientCard.module.css'
import React, {useMemo} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch } from "react-redux";
import {configureDetailedInfo} from "../../../../services/actions/ingredientDetailedInfo";
import {useDrag} from "react-dnd";
import PropTypes from "prop-types";

const IngredientCard = (props) => {

    const [, dragRef] = useDrag({
        type: props.burgerData.type,
        item: props.burgerData
    })

    const commonCart = useSelector(state => state.burgerConstructor)
    const quantity = useMemo(() => {
        let total = 0;
        for (let key in commonCart) {
            commonCart[key].forEach(item => {
                if (props.burgerData._id === item._id) {
                    total+=1
                }
            })
        }
        return total;
    }, [commonCart, props])

    const dispatch = useDispatch();
    return (
        <>
            <li ref={dragRef} className={`${styles.card}`} onClick={() => dispatch(configureDetailedInfo(props.burgerData))}>
                {quantity > 0 && <Counter count={quantity} size="default" extraClass="m-1" style={{position: 'absolute'}}/>}
                <div className={`${styles.card_image_wrapper} mb-1`}>
                    <img className={styles.card_image} src={props.burgerData.image} alt="картинка"/>
                </div>
                <p className={`${styles.price} mb-1`}><CurrencyIcon type="primary"/>{props.burgerData.price}</p>
                <h3 className={`${styles.name} text text_type_main-small pb-6`}>{props.burgerData.name}</h3>
            </li>
        </>
    )
}

IngredientCard.propTypes = {
    burgerData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    })
}

export default IngredientCard;