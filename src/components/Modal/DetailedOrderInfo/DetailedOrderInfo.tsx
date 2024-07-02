import React, {FunctionComponent, useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useDispatchTyped, useSelectorTyped as useSelector} from "../../../services/hooks/hooks";
import {IRootState} from "../../../services/reducers/root-reducer";
import {configureOrderDetailedInfo} from "../../../services/actions/orderDetailedInfo";
import {IOrder} from "../../../services/reducers/socket";
import {IngredientThumbnail} from "../../feed/OrdersQueue/OrderCard/Ingredient_thumbnail/IngredientThumbnail";
import {IIngredient} from "../../../utils/types";
import styles from './DetailedOrdeerInfo.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";


export const DetailedOrderInfo: FunctionComponent = () => {

    const dispatch = useDispatchTyped()

    const { detailedOrderNumber} = useParams();
    const { info } = useSelector((state: IRootState) => state.detailedOrderInfo);
    const data = useSelector((state: IRootState) => state.feedTableReducer.ordersArray);
    const ingredientsInfo = useSelector((state: IRootState) => state.burgerIngredients.ingredients);

    useEffect(() => {
        const currentOrderData = data!.filter((item: IOrder) => item._id === detailedOrderNumber)
        dispatch(configureOrderDetailedInfo(currentOrderData[0]));
    }, [detailedOrderNumber, data, dispatch]);

    interface IngredientsRow {
        ingredient: IIngredient | null
    }

    let totalPrice = useMemo<number | undefined>(() => {
        if (info) {
            return info!.ingredients.reduce((acc, current) => {
                const ingredient = ingredientsInfo!.find(ingredient => ingredient._id === current);
                return acc + (ingredient ? ingredient.price : 0);
            }, 0);
        }
    }, [info, ingredientsInfo])

    const Row: FunctionComponent<IngredientsRow> = ({ingredient}) => {
        return ingredient && (
            <div className={styles.row}>
                <div>
                    <IngredientThumbnail url={ingredient.image_mobile} index={0}/>
                    <h2 className={styles.row_header}>{ingredient.name}</h2>
                </div>
                <div>
                    <span className={styles.row_qty}>x 6</span>
                    <div>{ingredient.price}</div>
                </div>
            </div>
        )
    }

    const bla = ['bla', 'bla', 'bla', 'foo', 'bar', 'foo', 'bla',]

    let getIngredientsQty = (arr: string[]): {[key:string]:number} | null => {
        const res: { [key: string]: number } = {};
        arr.forEach(item => {
            res[item] = (res[item] || 0) + 1;
        })
        return res
    }

    console.log(info ? getIngredientsQty(info.ingredients): null)

    return info && (
        <section className={styles.wrapper}>
            <div className={styles.number}>#{info.number}</div>
            <h2 className={styles.header}>{info.name}</h2>
            <div className={styles.status} style={{color: info!.status === 'done' ? '#0cc' : 'red'}}>{info.status}</div>
            <h3 className={styles.nutrients}>состав:</h3>
            <ul className={styles.list}>
                {info.ingredients.map(ingredientNumber => {
                    return <li><Row ingredient={ingredientsInfo!.filter(item => item._id === ingredientNumber)[0]}/></li>
                })}
            </ul>
            <div className={styles.date}>
                <FormattedDate date={new Date(info.createdAt)}/>
                <span className={styles.price}><span>{totalPrice}</span><CurrencyIcon type="primary"/></span>
            </div>
        </section>
    )
}