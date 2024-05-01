import styles from './BurgerIngredients.module.css'
import React, {useMemo} from "react";
import IngredientsSection from "./IngridientsSection/IngredientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('булки');
    const filterIngredientTypeBy = (type) => props.burgerData.filter(item => item.type === type);

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
    }, [props.burgerData]);



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
                <div className={styles.ingredients}>
                    <IngredientsSection ingridientsData={buns}>булки</IngredientsSection>
                    <IngredientsSection ingridientsData={sauce}>соусы</IngredientsSection>
                    <IngredientsSection ingridientsData={main}>начинки</IngredientsSection>
                </div>
            </section>
        </>
    );
};

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
};

export default BurgerIngredients;