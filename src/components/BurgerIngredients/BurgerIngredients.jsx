import styles from './BurgerIngredients.module.css'
import React, {useEffect, useMemo} from "react";
import IngridientsSection from "./IngridientsSection/IngredientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('булки')
    const filterIngredientTypeBy = (type) => props.burgerData.filter(item => item.type === type)

    // возможно, тут лучше сделать через 3 переменные, чтобы у каждой было свое useMemo, т.к сейчас,
    // при изменении burgerData будет рендер всех 3 компонентов, в которые попадает результат useMemo..но это не точно

    const {buns, sauce, main} = useMemo(() => {
        if (props.burgerData) {
            return {
                buns: filterIngredientTypeBy('bun'),
                sauce: filterIngredientTypeBy('sauce'),
                main: filterIngredientTypeBy("main")
            }
        }
        return {
            buns: [],
            sauce: [],
            main: []
        }

    }, [props.burgerData])
    console.log(props.isDataLoaded)


    return (
        <>
            <section className={styles.section}>
                <h1 className={`${styles.section_header}`}>соберите бургер</h1>
                <nav>
                    <nav style={{display: 'flex', marginBottom: '40px'}}>
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
                {!props.isDataLoaded && <div>загрузка...</div>}
                {props.hasError && <div>ошибка при загрузке данных, попробуйте обновить страницу</div>}
                {props.isDataLoaded && <div className={styles.ingredients}>
                    <IngridientsSection ingridientsData={buns}>булки</IngridientsSection>
                    <IngridientsSection ingridientsData={sauce}>соусы</IngridientsSection>
                    <IngridientsSection ingridientsData={main}>начинки</IngridientsSection>
                </div>}
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