import styles from './ingredientPage.module.css'
import DetailedIngredientInfo from "../../components/Modal/DetailedIngredientInfo/DetailedIngredientInfo";
import React from "react";
export const IngredientPage: React.FunctionComponent = () => {
    return (
        <section className={styles.frame}>
            <DetailedIngredientInfo />
        </section>
    )
}