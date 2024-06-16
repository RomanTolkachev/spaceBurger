import IngredientCard from "./IngredientCard/IngredientCard";
import React, {PropsWithChildren} from "react";
import styles from './IngredientSection.module.css'
import { forwardRef } from "react";
import {IIngredient} from "../../../utils/types";

interface IIngredientSection {
    ingredientsData: IIngredient[]
    ref: React.ForwardedRef<HTMLDivElement>
}

const IngredientsSection = forwardRef<HTMLDivElement, PropsWithChildren<IIngredientSection>>(({
    children,
    ingredientsData
}, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref}>
            <h2 className={styles.header}>{children}</h2>
            <ul className={`${styles.list} `}>
                {ingredientsData.map((item,id) => (
                    <IngredientCard burgerData={item} key={id}/>
                ))}
            </ul>
        </div>
    )
})


export default IngredientsSection
