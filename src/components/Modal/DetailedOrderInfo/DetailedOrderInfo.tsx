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
import {getOrderInfo} from "../../../utils/api";


export const DetailedOrderInfo: FunctionComponent = () => {

    const dispatch = useDispatchTyped()

    const { detailedOrderNumber} = useParams();
    const detailedOrderInfo = useSelector((state: IRootState) => state.detailedOrderInfo.info);
    const ordersData = useSelector((state: IRootState) => state.feedTableReducer.ordersArray);
    const infoAboutIngredients = useSelector((state: IRootState) => state.burgerIngredients.ingredients);



    let order: IOrder | undefined = useSelector((state: IRootState) => {
        if (ordersData) {
            let searchableOrder = state.feedTableReducer.ordersArray!.find(o => o._id === detailedOrderNumber!)
            if (searchableOrder) {
                return searchableOrder
            }
        }
        // order = state.feedProfileReducer.ordersArray!.find(o => o.number === +detailedOrderNumber!)
        // if (searchableOrder) {
        //     return searchableOrder
        // }
    })

    useEffect(() => {
        if (!order) {
            getOrderInfo(detailedOrderNumber!)
            .then(res => res.orders[0] === 0 ? dispatch(configureOrderDetailedInfo(res.orders[0])) : null)
        }
        dispatch(configureOrderDetailedInfo(order!))
    }, []);


    let totalPrice = useMemo<number | undefined>(() => {
        if (detailedOrderInfo) {
            return detailedOrderInfo!.ingredients.reduce((acc, current) => {
                const ingredient = infoAboutIngredients!.find(ingredient => ingredient._id === current);
                return acc + (ingredient ? ingredient.price : 0);
            }, 0);
        }
    }, [detailedOrderInfo])

    interface IngredientsRow {
        ingredient: IIngredient | null
        qty: number | null
    }

    const Row: FunctionComponent<IngredientsRow> = ({ingredient, qty}) => {
        return ingredient && (
            <div className={styles.row}>
                <div>
                    <IngredientThumbnail url={ingredient.image_mobile} index={0}/>
                    <h2 className={styles.row_header}>{ingredient.name}</h2>
                </div>
                <div>
                    <span className={styles.row_qty}>x{qty}</span>
                    <div>{ingredient.price}</div>
                </div>
            </div>
        )
    }

    const ingredientsObject: {[key:string]:number} | null = useMemo(() => {
        let getIngredientsQty = (arr: string[]): {[key:string]:number} | null => {
            const res: { [key: string]: number } = {};
            arr.forEach(item => {
                res[item] = (res[item] || 0) + 1;
            })
            return res
        }
        if (detailedOrderInfo) {
            return getIngredientsQty(detailedOrderInfo.ingredients)
        } else return null

    }, [detailedOrderInfo])

    return (detailedOrderInfo ?
        <section className={styles.wrapper}>
            <div className={styles.number}>#{detailedOrderInfo.number}</div>
            <h2 className={styles.header}>{detailedOrderInfo.name}</h2>
            <div className={styles.status} style={{color: detailedOrderInfo!.status === 'done' ? '#0cc' : 'red'}}>{detailedOrderInfo.status}</div>
            <h3 className={styles.nutrients}>состав:</h3>
            <ul className={styles.list}>
                {Object.keys!(ingredientsObject!).map((ingredientNumber,index) => {
                    return <li key={index}><Row
                        key={index}
                        ingredient={infoAboutIngredients!.filter(item => item._id === ingredientNumber)[0]}
                        qty={ingredientsObject![ingredientNumber]}/></li>
                })}
            </ul>
            <div className={styles.date}>
                <FormattedDate date={new Date(detailedOrderInfo.createdAt)}/>
                <span className={styles.price}>
                    <span className={styles.total_price}>{totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </span>
            </div>
        </section> : <div>Данные отсутствуют</div>
    )
}