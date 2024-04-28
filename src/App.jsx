import React from 'react';
import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
// @ts-ignore
import styles from './App.module.css'
import burgerData from './utils/burgerData.json'

function App()  {
    return (
      <main>
        <AppHeader />
        <div className={styles.app}>
          <BurgerIngredients burgerData={burgerData} />
          <BurgerConstructor burgerData={burgerData}/>
        </div>
      </main>
  );
}

export default App;
