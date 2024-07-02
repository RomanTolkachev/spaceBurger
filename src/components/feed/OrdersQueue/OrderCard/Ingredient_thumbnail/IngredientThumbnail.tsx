import React, {FunctionComponent} from "react";
import styles from "./IngredientThumbnail.module.css";
import {IIngredient} from "../../../../../utils/types";
import {useMatch} from "react-router-dom";

interface IIngredientThumbnailProps {
    index: number,
    url: string
}

export const IngredientThumbnail: FunctionComponent<IIngredientThumbnailProps> = ({index, url}) => {

    const absolutePosition = useMatch('/feed')

    const absoluteRimStyles: any = {
        position: `absolute`,
        transform: `translateX(${index*45}px)`,
        zIndex: `${-index}`,
        top: '0',
    }

    return (
    <li className={styles.rim} style={
        {
            transform: `translateX(${index*45}px)`,
            zIndex: `${-index}`
        }
    }>
        <img className={styles.image} src={`${url}`} alt=""/>
    </li>
    )
}