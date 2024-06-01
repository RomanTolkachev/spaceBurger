import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {useEffect} from "react";
import {fetchIngredients} from "./services/actions/burgerIngredients";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "./components/AppHeader/AppHeader";
import Modal from "./components/Modal/Modal";
import DetailedIngredientInfo from "./components/Modal/DetailedIngredientInfo/DetailedIngredientInfo";
import {IngredientPage} from "./pages/ingredientPage/ingredientPage";
import {LoginPage} from "./pages/loginPage/loginPage";
import {RegisterPage} from "./pages/registerPage/registerPage";
import {ForgotPasswordPage} from "./pages/forgotPasswordPage/forgotPasswordPage";
import {ResetPasswordPage} from "./pages/resetPasswordPage/resetPasswordPage";
import {ProfilePage} from "./pages/profilePage/profilePage";
import {NotFoundPage} from "./pages/404Page/404Page";
import {checkUserAuth} from "./services/actions/user";
const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {


    const dispatch = useDispatch();

    const location = useLocation();
    const background = location.state && location.state.background;

    const dataIsLoaded = useSelector(state => state.burgerIngredients.ingredients)

    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[]);

    useEffect(() => {
        dispatch(checkUserAuth());
    }, [])


    return (
        <>
            <AppHeader/>
            {dataIsLoaded && <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="ingredients/:anyIdNumber" element={<IngredientPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
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
