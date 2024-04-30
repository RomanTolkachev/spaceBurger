import React from "react";
import styles from './DetailedIngredientInfo.module.css'

const DetailedIngredientInfo = (props) => {
    console.log(props.details)
    const nutrientsInfo = (
        <>
            <div className={styles.nutrients_item}>
                <h4>калории,ккал</h4>
                <span className={styles.nutrients_item_numbers}>{props.details.calories}</span>
            </div>
            <div className={styles.nutrients_item}>
                <h4>белки, г</h4>
                <span className={styles.nutrients_item_numbers}>{props.details.proteins}</span>
            </div>
            <div className={styles.nutrients_item}>
                <h4>Жиры, г</h4>
                <span className={styles.nutrients_item_numbers}>{props.details.fat}</span>
            </div>
            <div className={styles.nutrients_item}>
                <h4>Углеводы, г</h4>
                <span className={styles.nutrients_item_numbers}>{props.details.carbohydrates}</span>
            </div>
        </>
    )

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.header}> детали ингредиента</h3>
            <img className={styles.image} src={props.details.image_large} alt=""/>
            <h4 className={styles.item_name}>{props.details.name}</h4>
            <div className={styles.nutrients}>
                {nutrientsInfo}
            </div>
        </div>
    )
};
export default DetailedIngredientInfo;