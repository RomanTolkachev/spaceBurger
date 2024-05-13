import React from "react";
import styles from './DetailedIngredientInfo.module.css'
import {useSelector} from "react-redux";

const DetailedIngredientInfo = () => {

    const { info } = useSelector(state => state.ingredientDetailedInfo)

    const nutrientsInfo = (
        <>
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
        </>
    )

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.header}> детали ингредиента</h3>
            <img className={styles.image} src={info.image_large} alt=""/>
            <h4 className={styles.item_name}>{info.name}</h4>
            <div className={styles.nutrients}>
                {nutrientsInfo}
            </div>
        </div>
    )
};

export default DetailedIngredientInfo;