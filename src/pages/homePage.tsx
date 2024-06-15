import styles from "../App.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import React from "react";

export const HomePage: React.FC = () => {

    return (
        <main>
            <div className={styles.app}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </main>
    )
}