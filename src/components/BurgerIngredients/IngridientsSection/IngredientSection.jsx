import IngredientCard from "./IngredientCard/IngredientCard";
import React from "react";
import styles from './IngredientSection.module.css'
import { forwardRef } from "react";
import PropTypes from "prop-types";


const IngredientsSection = forwardRef(function IngredientsSection(props, ref) {

    return (
        <div ref={ref}>
            <h2 className={styles.header}>{props.children}</h2>
            <ul className={`${styles.list} `}>
                {props.ingredientsData.map((item,id) => (
                    <IngredientCard burgerData={item} key={id}/>
                ))}
            </ul>
        </div>
    )
})

IngredientsSection.propTypes = {
    children: PropTypes.node.isRequired,
    ingredientsData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    }))
}

export default IngredientsSection
