import React, {FunctionComponent} from "react";
import styles from "./IngredientThumbnail.module.css";
import {IIngredient} from "../../../../../utils/types";

interface IIngredientThumbnailProps {
    index: number,
    ingredientData: IIngredient
}

export const IngredientThumbnail: FunctionComponent<IIngredientThumbnailProps> = ({index, ingredientData}) => {
    return (
    <li className={styles.rim} style={{transform: `translateX(${index*45}px)`, zIndex: `${-index}`}}>
        <img style={{backgroundColor: 'black'}} className={styles.image} src={`${ingredientData.image_mobile}`} alt=""/>
    </li>
    )
}