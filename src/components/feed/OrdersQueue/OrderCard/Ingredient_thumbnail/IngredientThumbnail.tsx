import React, {FunctionComponent} from "react";
import styles from "./IngredientThumbnail.module.css";
import {useMatch} from "react-router-dom";

interface IIngredientThumbnailProps {
    index: number,
    url: string
}

export const IngredientThumbnail: FunctionComponent<IIngredientThumbnailProps> = ({index, url}) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const relativePosition = useMatch('/feed') || useMatch('/profile/history')

    const relativeRimStyles: any = {
        position: `relative`,
    }

    return (
    <div className={styles.rim} style={relativePosition ? {transform: `translateX(${index*45}px)`, zIndex: `${-index}`} : relativeRimStyles}>
        <img className={styles.image} src={`${url}`} alt=""/>
    </div>
    )
}