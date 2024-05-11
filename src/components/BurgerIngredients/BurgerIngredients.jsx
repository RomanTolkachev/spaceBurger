import styles from './BurgerIngredients.module.css'
import React, {useEffect, useMemo, useRef} from "react";
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
    },[]);

    const burgerIngRef = useRef(null);
    const bunsRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {

        const getCurrentTab = () => {
            const itemsWithDifference = {
                buns: Math.abs(bunsRef.current.getBoundingClientRect().top - burgerIngRef.current.getBoundingClientRect().top),
                sauce: Math.abs(sauceRef.current.getBoundingClientRect().top - burgerIngRef.current.getBoundingClientRect().top),
                main: Math.abs(mainRef.current.getBoundingClientRect().top - burgerIngRef.current.getBoundingClientRect().top)
            }
            const minimalDifference = Math.min(...Object.values(itemsWithDifference));
            return Object.keys(itemsWithDifference).find(key => itemsWithDifference[key] === minimalDifference);
        }

        const compareStoreAndScroll = () => {
            const currentSection = getCurrentTab()
            if (currentSection !== currentTab) {
                dispatch(setCurrentTab(currentSection))
            }
        }

        burgerIngRef.current.addEventListener('scroll', compareStoreAndScroll);
        return () => {burgerIngRef.current.removeEventListener('scroll', compareStoreAndScroll)};

    }, [currentTab]);

    return (
        <>
            <section className={styles.section}>
                <h1 className={`${styles.section_header}`}>соберите бургер</h1>
                <nav>
                    <nav style={{display: 'flex', marginBottom: '40px'}}>
                        <Tab value="buns" active={currentTab === 'buns'} onClick={() => dispatch(setCurrentTab('buns'))}>
                            булки
                        </Tab>
                        <Tab value="sauce" active={currentTab === "sauce"} onClick={() => dispatch(setCurrentTab("sauce"))}>
                            соусы
                        </Tab>
                        <Tab value="main" active={currentTab === "main"} onClick={() => dispatch(setCurrentTab("main"))}>
                            начинки
                        </Tab>
                    </nav>
                </nav>
                <div className={styles.ingredients} ref={burgerIngRef}>
                    {hasError && !isLoading && <div className={styles.error}>не удалось загрузить данные,<br/> попробуйте обновить страницу</div>}
                    {isLoading && <div className={styles.preloader}></div>}
                    {!isLoading && !hasError && <IngredientsSection ref={bunsRef} ingridientsData={buns}>булки</IngredientsSection>}
                    {!isLoading && !hasError && <IngredientsSection ref={sauceRef} ingridientsData={sauce}>соусы</IngredientsSection>}
                    {!isLoading && !hasError && <IngredientsSection ref={mainRef} ingridientsData={main}>начинки</IngredientsSection>}
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