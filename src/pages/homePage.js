import styles from "../App.module.css";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";

export const HomePage = () => {

    return (
        <main>
            <div className={styles.app}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </main>
    )
}