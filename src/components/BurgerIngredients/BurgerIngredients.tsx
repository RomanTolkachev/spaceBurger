import styles from './BurgerIngredients.module.css'
import React, {useCallback, useMemo, useRef} from "react";
import IngredientsSection from "./IngridientsSection/IngredientSection";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector, useDispatch} from "react-redux";
import {setCurrentTab} from "../../services/actions/burgerIngredients";
import {IRootState} from "../../services/reducers/root-reducer";
import {IIngredient} from "../../utils/types";

const BurgerIngredients: React.FunctionComponent = () => {

    const dispatch = useDispatch();

    const isLoading: boolean = useSelector((state: IRootState) => state.burgerIngredients.isLoading);
    const currentTab: string | undefined = useSelector((state: IRootState) => state.burgerIngredients.currentTab);
    const hasError: boolean = useSelector((state: IRootState) => state.burgerIngredients.hasError);
    const ingredients: IIngredient[] | null = useSelector((state: IRootState) => state.burgerIngredients.ingredients);

    const {buns, sauce, main} = useMemo(() => {
    const filterIngredientTypeBy = (type: string) => ingredients!.filter(item => item.type === type);
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


    const burgerIngRef: React.RefObject<HTMLDivElement> = useRef(null);
    const bunsRef: React.RefObject<HTMLDivElement> = useRef(null);
    const sauceRef: React.RefObject<HTMLDivElement> = useRef(null);
    const mainRef: React.RefObject<HTMLDivElement> = useRef(null);

    const getCurrentTab = useCallback(() => {
        const itemsWithDifference: {buns: number, sauce: number, main: number, [key: string]: number} = {
            buns: Math.abs(bunsRef.current!.getBoundingClientRect().top - burgerIngRef.current!.getBoundingClientRect().top),
            sauce: Math.abs(sauceRef.current!.getBoundingClientRect().top - burgerIngRef.current!.getBoundingClientRect().top),
            main: Math.abs(mainRef.current!.getBoundingClientRect().top - burgerIngRef.current!.getBoundingClientRect().top)
        }
        const minimalDifference = Math.min(...Object.values(itemsWithDifference));
        return Object.keys(itemsWithDifference).find(key => itemsWithDifference[key] === minimalDifference);
    }, [])

    const compareStoreAndScroll = useCallback(() => {
        const currentSection = getCurrentTab();
        if (currentSection !== currentTab) { //@ts-ignore
            dispatch(setCurrentTab( currentSection))
        }
    }, [currentTab, dispatch, getCurrentTab])

    const handleSetTab = (type: string) => {
        //@ts-ignore
        return dispatch(setCurrentTab(type))
    }

    return (
        <>
            <section className={styles.section}>
                <h1 className={`${styles.section_header}`}>соберите бургер</h1>
                <nav>
                    <nav className={styles.nav}>
                        <Tab value="buns" active={currentTab === 'buns'} onClick={() => handleSetTab('buns', )}>
                            булки
                        </Tab>
                        <Tab value="sauce" active={currentTab === "sauce"} onClick={() =>handleSetTab("sauce")}>
                            соусы
                        </Tab>
                        <Tab value="main" active={currentTab === "main"} onClick={() =>handleSetTab("main")}>
                            начинки
                        </Tab>
                    </nav>
                </nav>
                <div className={styles.ingredients} ref={burgerIngRef} onScroll={compareStoreAndScroll}>
                    {hasError && !isLoading && <div className={styles.error}>не удалось загрузить данные,<br/> попробуйте обновить страницу</div>}
                    {isLoading && <div className={styles.preloader}></div>}
                    {!isLoading && !hasError && <IngredientsSection ref={bunsRef} ingredientsData={buns}>булки</IngredientsSection>}
                    {!isLoading && !hasError && <IngredientsSection ref={sauceRef} ingredientsData={sauce}>соусы</IngredientsSection>}
                    {!isLoading && !hasError && <IngredientsSection ref={mainRef} ingredientsData={main}>начинки</IngredientsSection>}
                </div>
            </section>
        </>
    );
};

export default BurgerIngredients;