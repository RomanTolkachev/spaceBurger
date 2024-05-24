import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {useEffect} from "react";
import {fetchIngredients} from "./services/actions/burgerIngredients";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "./components/AppHeader/AppHeader";
import Modal from "./components/Modal/Modal";
import DetailedIngredientInfo from "./components/Modal/DetailedIngredientInfo/DetailedIngredientInfo";
const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {

    const dispatch = useDispatch();

    const modalInfo = useSelector(state => state.ingredientDetailedInfo.info)
    const burgersData = useSelector(state => state.burgerIngredients.ingredients)

    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[]);

    return (
        <>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="ingredients/:anyIdNumber" element={<><h1>sdfsdfsdf</h1><h1>компонент бэкграунд</h1></>}/>
            </Routes>

            {
                background && (
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
