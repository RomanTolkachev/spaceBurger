import React, {FunctionComponent, useMemo} from "react";
import styles from "./OrderCard.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IOrder} from "../../../../services/reducers/socket";
import {IngredientThumbnail} from "./Ingredient_thumbnail/IngredientThumbnail";
import {useSelector} from "react-redux";
import {IRootState} from "../../../../services/reducers/root-reducer";
interface IOrderCardProps {
    data: IOrder
}

export const OrderCard: FunctionComponent<IOrderCardProps> = ({data}) => {

    const ingredientsInfo = useSelector((state: IRootState) => state.burgerIngredients.ingredients);

    let totalPrice: number = useMemo<number>(() => {
        return data.ingredients.reduce((acc, current) => {
            const ingredient = ingredientsInfo!.find(ingredient => ingredient._id === current);
            return acc + (ingredient ? ingredient.price : 0);
        }, 0);
    }, [data.ingredients, ingredientsInfo])

    return (
        <li className={styles.wrapper}>
            <div className={styles.order_info}>
                <span className={styles.number}>{data.number}</span>
                <span className={styles.time}><FormattedDate date={new Date(data.createdAt)} /></span>
            </div>
            <h3 className={styles.order_name}>
                {data.name}
            </h3>
            <div className={styles.order_ingredients_thumbnails}>
                <ul className={styles.list}>{data.ingredients.map((item, index) => {
                    return <IngredientThumbnail
                        key={index}
                        index={index}
                        ingredientData={ingredientsInfo!.filter(iterable => iterable._id === item)[0]}
                    />
                })}</ul>
                <span className={styles.price}>
                    <CurrencyIcon type="primary" />
                    <span>{totalPrice}</span>
                </span>
            </div>
        </li>
    )
}