import React, {useEffect, useMemo} from 'react';
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import styles from './App.module.css';
import {useSelector, useDispatch} from "react-redux";
import { fetchIngredients } from "./services/actions/burgerIngredients";



function App() {

    const dispatch = useDispatch();
    const {isLoading, hasError } = useSelector(state => state.burgerIngredients)


    return (
      <main>
        <AppHeader />
        <div className={styles.app}>
            {hasError && <div className={styles.error}>не удалось загрузить данные,<br/> попробуйте обновить страницу</div>}

            <BurgerIngredients />
            <BurgerConstructor />
        </div>
      </main>
  );
}

export default App;
