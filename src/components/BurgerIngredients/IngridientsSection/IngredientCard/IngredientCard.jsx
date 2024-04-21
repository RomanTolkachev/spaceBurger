import styles from './IngredientCard.module.css'
import React from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientCard extends React.Component {

    render() {
        return (
            <>
                <li className={`${styles.card}  `}>
                    <Counter  count={1} size="default" extraClass="m-1" style={{position: 'absolute'}}/>
                    <div className={`${styles.card_image_wrapper} mb-1`}>
                        <img className={styles.card_image} src={this.props.burgerData.image} alt="картинка"
                             onLoad={() => console.log("Изображение загружено!")}/>
                    </div>
                    <p className={`${styles.price} mb-1`}><CurrencyIcon type="primary"/>{this.props.burgerData.price}</p>
                    <h4 className={`${styles.name} text text_type_main-small pb-6`}>{this.props.burgerData.name}</h4>
                </li>
            </>
        )
    }
}

export default IngredientCard;