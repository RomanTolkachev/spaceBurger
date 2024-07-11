import React, {FunctionComponent, useMemo} from "react";
import styles from "./OrderCard.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IOrder} from "../../../../services/reducers/socket";
import {IngredientThumbnail} from "./Ingredient_thumbnail/IngredientThumbnail";
import {Link, useLocation, useMatch} from "react-router-dom";
import {useSelectorTyped} from "../../../../services/hooks/hooks";

interface IOrderCardProps {
    data: IOrder
}

export const OrderCard: FunctionComponent<IOrderCardProps> = ({data}) => {

    const ingredientsInfo = useSelectorTyped((state) => state.burgerIngredients.ingredients);

    let totalPrice: number = useMemo<number>(() => {
        return data.ingredients.reduce((acc, current) => {
            const ingredient = ingredientsInfo!.find(ingredient => ingredient._id === current);
            return acc + (ingredient ? ingredient.price : 0);
        }, 0);
    }, [data.ingredients, ingredientsInfo])

    const location: {state: string, pathname: string} = useLocation()

    return (
        <Link to={`${useLocation().pathname}/${data.number}`} state={{ background: location }} className={styles.link}>
            <li className={styles.wrapper}>
                <div className={styles.order_info}>
                    <span className={styles.number}>{data.number}</span>
                    <span className={styles.time}><FormattedDate date={new Date(data.createdAt)}/></span>
                </div>
                <h3 className={styles.order_name}>
                    {data.name}
                </h3>
                {useMatch('/profile/history') ? <span style={data.status==='done' ? {color: '#0cc'} : undefined}>{data.status}</span> : null}
                <div className={styles.order_ingredients_thumbnails}>
                    <ul className={styles.list}>{data.ingredients.map((item, index) => {
                        return <IngredientThumbnail
                            key={index}
                            index={index}
                            url={ingredientsInfo!.filter(iterable => iterable._id === item)[0].image_mobile}
                        />
                    })}</ul>
                    <span className={styles.price}>
                        <CurrencyIcon type="primary"/>
                        <span>{totalPrice}</span>
                    </span>
                </div>
            </li>
        </Link>
    )
}