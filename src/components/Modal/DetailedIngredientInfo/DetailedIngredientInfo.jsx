import React, {useEffect} from "react";
import styles from './DetailedIngredientInfo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {configureDetailedInfo} from "../../../services/actions/ingredientDetailedInfo";

const DetailedIngredientInfo = () => {
    const dispatch = useDispatch();

    const { anyIdNumber } = useParams();
    const { info } = useSelector(state => state.ingredientDetailedInfo);

    const data = useSelector(state => state.burgerIngredients.ingredients);

    useEffect(() => {
        const currentIngredientData = data.find(item => item._id === anyIdNumber)
        dispatch(configureDetailedInfo(currentIngredientData));
    }, []);


    const nutrientsInfo = (
        info && (<>
            <div className={styles.nutrients_item}>
                <h4>калории,ккал</h4>
                <span className={styles.nutrients_item_numbers}>{info.calories}</span>
            </div>
            <div className={styles.nutrients_item}>
                <h4>белки, г</h4>
                <span className={styles.nutrients_item_numbers}>{info.proteins}</span>
            </div>
            <div className={styles.nutrients_item}>
                <h4>Жиры, г</h4>
                <span className={styles.nutrients_item_numbers}>{info.fat}</span>
            </div>
            <div className={styles.nutrients_item}>
                <h4>Углеводы, г</h4>
                <span className={styles.nutrients_item_numbers}>{info.carbohydrates}</span>
            </div>
        </>)
    );

    return (
        info &&
        (<div className={styles.wrapper}>
                <h3 className={styles.header}> детали ингредиента</h3>
                <img className={styles.image} src={info.image_large} alt=""/>
                <h4 className={styles.item_name}>{info.name}</h4>
                <div className={styles.nutrients}>
                    {nutrientsInfo}
                </div>
            </div>
    )   )
};

export default DetailedIngredientInfo;