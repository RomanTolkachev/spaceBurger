import styles from './ingredientPage.module.css'
import DetailedIngredientInfo from "../../components/Modal/DetailedIngredientInfo/DetailedIngredientInfo";
export const IngredientPage = () => {
    return (
        <section className={styles.frame}>
            <DetailedIngredientInfo />
        </section>
    )
}