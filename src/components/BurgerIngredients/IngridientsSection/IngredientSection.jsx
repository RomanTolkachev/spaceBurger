import IngredientCard from "./IngredientCard/IngredientCard";
import React from "react";
import styles from './IngredientSection.module.css'

const IngridientsSection = (props) => {
    return (
        <div>
            <h2 className={styles.header}>{props.children}</h2>
            <ul className={`${styles.list} `}>
                {props.ingridientsData.map(item => (
                    <IngredientCard burgerData={item} key={item.id}/>
                ))}
            </ul>
        </div>
    )
}

export default IngridientsSection
