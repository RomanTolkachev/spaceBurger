import React, {FunctionComponent, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatchTyped, useSelectorTyped as useSelector} from "../../../services/hooks/hooks";
import {IRootState} from "../../../services/reducers/root-reducer";
import {configureOrderDetailedInfo} from "../../../services/actions/orderDetailedInfo";
import {IOrder} from "../../../services/reducers/socket";
import {IngredientThumbnail} from "../../feed/OrdersQueue/OrderCard/Ingredient_thumbnail/IngredientThumbnail";
import {IIngredient} from "../../../utils/types";


export const DetailedOrderInfo: FunctionComponent = () => {

    const dispatch = useDispatchTyped()

    const { detailedOrderNumber} = useParams();
    const { info } = useSelector((state: IRootState) => state.detailedOrderInfo);

    const data = useSelector((state: IRootState) => state.feedTableReducer.ordersArray);

    useEffect(() => {
        const currentOrderData = data!.filter((item: IOrder) => item._id === detailedOrderNumber)
        dispatch(configureOrderDetailedInfo(currentOrderData[0]));
    }, [detailedOrderNumber, data, dispatch]);

    const ingredientsInfo = useSelector((state: IRootState) => state.burgerIngredients.ingredients);

    interface IngredientsRow {
        ingredient: IIngredient | null
    }

    const Row: FunctionComponent<IngredientsRow> = ({ingredient}) => {
        return ingredient && (
            <>
                <IngredientThumbnail url={ingredient.image_mobile} index={0}/>
                <h2>{ingredient.name}</h2>
                <div>{ingredient.price}</div>
            </>
        )
    }

    return info && ( // @ts-ignore
        <>
            <div>#{info.number}</div>
            <h2>{info.name}</h2>
            <div>{info.status}</div>
            <h3>состав:</h3>
            <ul>
                {info.ingredients.map(ingredientNumber => {
                    return <Row ingredient={ingredientsInfo!.filter(item => item._id === ingredientNumber)[0]}/>
                })}
            </ul>
        </>

    )
}