import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import React, {useEffect} from "react";
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
import {OnlyAuth, OnlyUnAuth,} from "./components/ProtectedRoute/ProtectedRoute";
import {ProfileChange} from "./components/ProfileChange/ProfileChange";
import OrderModal from "./components/Modal/OrderModal/OrderModal";
import {BASE_URL} from "./utils/api";
const url = `${BASE_URL}/ingredients`

function App() {

    const dispatch = useDispatch();

    const location = useLocation();
    const background = location.state && location.state.background;

    const dataIsLoaded = useSelector(state => state.burgerIngredients.ingredients)
    const orderNumber = useSelector(state => state.orderStore.modalContent);

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
                <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path="/profile">
                    <Route path="" element={<OnlyAuth component={<ProfilePage component={<ProfileChange/>} />} />}></Route>
                    <Route path="history" element={<OnlyAuth component={<ProfilePage component={null} />} />}></Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>}
            {orderNumber && <Modal>
                <OrderModal>{orderNumber}</OrderModal>
            </Modal>}

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
