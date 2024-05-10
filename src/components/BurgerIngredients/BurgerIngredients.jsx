import styles from './BurgerIngredients.module.css'
import React, {useEffect, useMemo} from "react";
import IngredientsSection from "./IngridientsSection/IngredientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {fetchIngredients, setCurrentTab} from "../../services/actions/burgerIngredients";
const url = "https://norma.nomoreparties.space/api/ingredients"

const BurgerIngredients = () => {


    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[])

    const { ingredients } = useSelector(state => state.burgerIngredients)

    const dispatch = useDispatch();
    const {isLoading, currentTab} = useSelector(state => state.burgerIngredients);
    const filterIngredientTypeBy = (type) => ingredients.filter(item => item.type === type);

    // возможно, тут лучше сделать через 3 переменные, чтобы у каждой было свое useMemo, т.к сейчас,
    // при изменении burgerData будет рендер всех 3 компонентов, в которые попадает результат useMemo..но это не точно

    const {buns, sauce, main} = useMemo(() => {
        if (ingredients) {
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
    }, [ingredients]);



    return (
        <>
            <section className={styles.section}>
                <h1 className={`${styles.section_header}`}>соберите бургер</h1>
                <nav>
                    <nav style={{display: 'flex', marginBottom: '40px'}}>
                        <Tab value="булки" active={currentTab === 'булки'} onClick={() => dispatch(setCurrentTab('булки'))}>
                            булки
                        </Tab>
                        <Tab value="соусы" active={currentTab === 'соусы'} onClick={() => dispatch(setCurrentTab('соусы'))}>
                            соусы
                        </Tab>
                        <Tab value="начинки" active={currentTab === 'начинки'} onClick={() => dispatch(setCurrentTab('начинки'))}>
                            начинки
                        </Tab>
                    </nav>
                </nav>
                <div className={styles.ingredients}>
                    {isLoading && <div className={styles.preloader}></div>}
                    {!isLoading && <IngredientsSection ingridientsData={buns}>булки</IngredientsSection>}
                    {!isLoading && <IngredientsSection ingridientsData={sauce}>соусы</IngredientsSection>}
                    {!isLoading && <IngredientsSection ingridientsData={main}>начинки</IngredientsSection>}
                </div>
            </section>
        </>
    );
};

export default BurgerIngredients;