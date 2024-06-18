import styles from './IngredientCard.module.css'
import React, {useMemo} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {IRootState} from "../../../../services/reducers/root-reducer";
import {IBurgerConstructorStore} from "../../../../services/reducers/burgerCounstructor";
import {IIngredient} from "../../../../utils/types";


interface IIngredientCard {
    burgerData: IIngredient
}

const IngredientCard: React.FC<IIngredientCard> = ({burgerData}) => {

    const location: {state: string} = useLocation()

    const [, dragRef] = useDrag({
        type: burgerData.type,
        item: burgerData
    })

    const commonCart: IBurgerConstructorStore = useSelector((state:IRootState) => state.burgerConstructor)
    const quantity: number = useMemo<number>(() => {
        let total: number = 0;
        for (let key in commonCart) {
            // eslint-disable-next-line no-loop-func
            commonCart[key].forEach(item => {
                if (burgerData._id === item._id) {
                    total+=1
                }
            })
        }
        return total;
    }, [commonCart, burgerData])

    return (
        <>
            <Link to={`/ingredients/${burgerData._id}`} state={{ background: location }} className={styles.link}>
                <li ref={dragRef} className={`${styles.card}`}>
                    {quantity > 0 && <Counter count={quantity} size="default" extraClass={styles.counter}/>}
                    <div className={`${styles.card_image_wrapper} mb-1`}>
                        <img className={styles.card_image} src={burgerData.image} alt="картинка"/>
                    </div>
                    <p className={`${styles.price} mb-1`}><CurrencyIcon type="primary"/>{burgerData.price}</p>
                    <h3 className={`${styles.name} text text_type_main-small pb-6`}>{burgerData.name}</h3>
                </li>
            </Link>
        </>
    )
}

export default IngredientCard;