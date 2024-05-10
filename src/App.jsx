import React, {useEffect, useMemo} from 'react';
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import styles from './App.module.css';
import {useSelector, useDispatch} from "react-redux";
import { fetchIngredients } from "./services/actions/burgerIngredients";

const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {

    const dispatch = useDispatch();
    const {ingredients, isLoading, hasError } = useSelector(state => state.burgerIngredients)

    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[])

    return (
      <main>
        <AppHeader />
        <div className={styles.app}>
            {hasError && <div className={styles.error}>не удалось загрузить данные,<br/> попробуйте обновить страницу</div>}
            {isLoading && <div className={styles.preloader}></div>}
            {!isLoading && !hasError && <BurgerIngredients burgerData={ingredients} />}
            {!isLoading && !hasError && <BurgerConstructor />}
        </div>
      </main>
  );
}

export default App;
