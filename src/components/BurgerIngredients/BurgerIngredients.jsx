import styles from './BurgerIngredients.module.css'
import React, {useEffect, useMemo} from "react";
import IngredientsSection from "./IngridientsSection/IngredientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from "react-redux";
import {fetchIngredients, setCurrentTab} from "../../services/actions/burgerIngredients";
import Modal from "../Modal/Modal";
import DetailedIngredientInfo from "../Modal/DetailedIngredientInfo/DetailedIngredientInfo";
const url = "https://norma.nomoreparties.space/api/ingredients"

const BurgerIngredients = () => {


    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.burgerIngredients)
    const { isLoading, currentTab, hasError } = useSelector(state => state.burgerIngredients);
    const { info } = useSelector(state => state.ingredientDetailedInfo)
    const filterIngredientTypeBy = (type) => ingredients.filter(item => item.type === type);
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

    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[])

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
                    {hasError && !isLoading && <div className={styles.error}>не удалось загрузить данные,<br/> попробуйте обновить страницу</div>}
                    {isLoading && <div className={styles.preloader}></div>}
                    {!isLoading && !hasError && <IngredientsSection ingridientsData={buns}>булки</IngredientsSection>}
                    {!isLoading && !hasError && <IngredientsSection ingridientsData={sauce}>соусы</IngredientsSection>}
                    {!isLoading && !hasError && <IngredientsSection ingridientsData={main}>начинки</IngredientsSection>}
                </div>
            </section>
            {info &&
                <Modal>
                    <DetailedIngredientInfo/>
                </Modal>
            }
        </>
    );
};

export default BurgerIngredients;