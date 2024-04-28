import styles from './BurgerIngredients.module.css'
import React from "react";
import IngridientsSection from "./IngridientsSection/IngridientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('булки')
    return (
        <>
            <section className={styles.section}>
                <h2 className={`${styles.section_header}`}>соберите бургер</h2>
                <nav>
                    <nav style={{ display: 'flex', marginBottom: '40px'}}>
                        <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
                            булки
                        </Tab>
                        <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
                            соусы
                        </Tab>
                        <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
                            начинки
                        </Tab>
                    </nav>
                </nav>
                <div className={styles.ingredients}>
                    <IngridientsSection ingridientsData={props.burgerData.filter(item => item.type === "bun")}>булки</IngridientsSection>
                    <IngridientsSection ingridientsData={props.burgerData.filter(item => item.type === "sauce")}>соусы</IngridientsSection>
                    <IngridientsSection ingridientsData={props.burgerData.filter(item => item.type === "main")}>начинки</IngridientsSection>
                </div>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    burgerData: PropTypes.arrayOf(PropTypes.shape({
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

export default BurgerIngredients;