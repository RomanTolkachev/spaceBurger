import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {useEffect} from "react";
import {fetchIngredients} from "./services/actions/burgerIngredients";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "./components/AppHeader/AppHeader";
import Modal from "./components/Modal/Modal";
import DetailedIngredientInfo from "./components/Modal/DetailedIngredientInfo/DetailedIngredientInfo";
import {IngredientPage} from "./pages/ingredientPage/ingredientPage";
const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {

    const dispatch = useDispatch();

    const location = useLocation();
    const background = location.state && location.state.background;

    const dataIsLoaded = useSelector(state => state.burgerIngredients.ingredients)

    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[]);


    return (
        <>
            <AppHeader/>
            {dataIsLoaded && <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="ingredients/:anyIdNumber" element={<IngredientPage />} />
            </Routes>}

            {
                dataIsLoaded && background && (
                    <Routes>
                        <Route path="/ingredients/:anyIdNumber"
                               element={
                            <Modal>
                                <DetailedIngredientInfo/>
                            </Modal>} />
                    </Routes>
                )
            }
        </>
    );
}

export default App;
