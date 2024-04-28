import styles from './BurgerIngredients.module.css'
import React, {useMemo} from "react";
import IngridientsSection from "./IngridientsSection/IngridientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('булки')
    const filterIngredientTypeBy = (type) => props.burgerData.filter(item => item.type === type)

    const [buns, sauce, main] = useMemo(() => {
        return [
            filterIngredientTypeBy('buns'),
            filterIngredientTypeBy('sauce'),
            filterIngredientTypeBy("main")
        ]
    }, [props.burgerData])

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
                    <IngridientsSection ingridientsData={buns}>булки</IngridientsSection>
                    <IngridientsSection ingridientsData={sauce}>соусы</IngridientsSection>
                    <IngridientsSection ingridientsData={main}>начинки</IngridientsSection>
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