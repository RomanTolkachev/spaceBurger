import React, {useEffect} from 'react';
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
// @ts-ignore
import styles from './App.module.css'

const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {

    const [fetchedData, setFetchedData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        setHasError(false)
        fetch(url)
        .then(res => res.json())
        .then(resJson => setFetchedData(resJson.data))
        .catch(error => {
            setHasError(true)
            return console.log(error)
        })
        .finally(() => {
            setIsLoading(false); return console.log("фетч завершен")
        })
    },[])

    return (
      <main>
        <AppHeader />
        <div className={styles.app}>
            <BurgerIngredients
                burgerData={fetchedData}
                isDataLoaded={!isLoading}
                hasError={hasError}
            />
            <BurgerConstructor
                burgerData={fetchedData}
                isDataLoaded={!isLoading}
                hasError={hasError}
            />
        </div>
      </main>
  );
}

export default App;
