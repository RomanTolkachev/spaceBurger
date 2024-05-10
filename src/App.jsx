import React, {useEffect, useMemo} from 'react';
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import styles from './App.module.css';
import {useSelector, useDispatch} from "react-redux";
import {FETCH_INGREDIENTS} from "./services/actions/burgerIngredients";
import { fetchWithAction } from "./services/actions/burgerIngredients";

const url = "https://norma.nomoreparties.space/api/ingredients!!"

function App() {

    const dispatch = useDispatch();

    const [fetchedData, setFetchedData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    function getData(url) {
        setIsLoading(true);
        setHasError(false)
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(`Ошибка при запросе: ${res.status}`)
                }
            })
            .then(resJson => setFetchedData(resJson.data))
            .catch(error => {
                setHasError(true)
                return console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            }
        )
    }

    useEffect(() => {
        getData(url);
        dispatch(fetchWithAction(url))
    },[])

    return (
      <main>
        <AppHeader />
        <div className={styles.app}>
            {hasError && <div className={styles.error}>не удалось загрузить данные,<br/> попробуйте обновить страницу</div>}
            {isLoading && <div className={styles.preloader}></div>}
            {!isLoading && !hasError && <BurgerIngredients burgerData={fetchedData} />}
            {!isLoading && !hasError && <BurgerConstructor burgerData={fetchedData} />}
        </div>
      </main>
  );
}

export default App;
