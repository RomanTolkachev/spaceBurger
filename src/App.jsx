import AppHeader from "./components/AppHeader/AppHeader.jsx";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor.jsx"
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import styles from './App.module.css';

function App() {

    return (
      <main>
        <AppHeader />
        <div className={styles.app}>
            <BurgerIngredients />
            <BurgerConstructor />
        </div>
      </main>
  );
}

export default App;
