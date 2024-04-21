import IngredientCard from "./IngredientCard/IngredientCard";
import React from "react";
import styles from './IngridientSection.module.css'

const IngridientsSection = (props) => {
    return (
        <div>
            <h3 className={styles.header}>{props.children}</h3>
            <ul className={`${styles.list} `}>
                {props.ingridientsData.map(item => (
                    <IngredientCard burgerData={item} key={item.id}/>
                ))}
            </ul>
        </div>
    )
}

export default IngridientsSection
