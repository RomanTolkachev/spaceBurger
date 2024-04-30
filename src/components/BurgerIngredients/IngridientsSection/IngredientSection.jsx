import IngredientCard from "./IngredientCard/IngredientCard";
import React from "react";
import styles from './IngredientSection.module.css'

const IngredientsSection = (props) => {
    return (
        <div>
            <h2 className={styles.header}>{props.children}</h2>
            <ul className={`${styles.list} `}>
                {props.ingridientsData.map((item,id) => (
                    <IngredientCard burgerData={item} key={id}/>
                ))}
            </ul>
        </div>
    )
}

export default IngredientsSection
