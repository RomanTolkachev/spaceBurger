import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import React, {useCallback, useEffect} from "react";
import {handleFailedFetch, setIngredients, startFetch} from "./services/actions/burgerIngredients";
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
import {finishAuthStatus,setUser} from "./services/actions/user";
import {OnlyAuth, OnlyUnAuth,} from "./components/ProtectedRoute/ProtectedRoute";
import {ProfileChange} from "./components/ProfileChange/ProfileChange";
import OrderModal from "./components/Modal/OrderModal/OrderModal";
import {getUserData, fetchIngredients} from "./utils/api";
import {clearOrderNumber} from "./services/actions/order";
import {clearDetailedInfo} from "./services/actions/ingredientDetailedInfo";
import {IRootState} from "./services/reducers/root-reducer";

function App():React.JSX.Element {

    const dispatch = useDispatch();

    type TNavigate = ReturnType<typeof useNavigate> // TODO: разобраться в этом на 5 спринте
    const navigate: TNavigate = useNavigate()
    const location: {state: { background: string }} = useLocation();
    const background: string = location.state && location.state.background;

    const dataIsLoaded = useSelector((state: IRootState) => state.burgerIngredients.ingredients) // TODO: set useSelector types
    const orderNumber = useSelector((state: IRootState) => state.orderStore.modalContent); // TODO: set useSelector types

    useEffect(() => { //@ts-ignore
        dispatch(startFetch());
        fetchIngredients() //@ts-ignore
        .then(res => dispatch(setIngredients(res))) //@ts-ignore
        .catch(() => dispatch(handleFailedFetch()))
    },[dispatch]);

    useEffect(() => {
        getUserData()//@ts-ignore
        .then(res => dispatch(setUser(res)))
        .catch(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        })
        .finally(() => { //@ts-ignore
            dispatch(finishAuthStatus())
        })
    }, [dispatch])

    const {modalContent} = useSelector((state: IRootState) => state.orderStore);


    const closeModal = useCallback(() => {
        if (modalContent) { //@ts-ignore
            dispatch(clearOrderNumber());
        } else { //@ts-ignore
            dispatch(clearDetailedInfo());
            return navigate(-1)
        }
    },[dispatch, modalContent, navigate])

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
            {orderNumber && <Modal closeModal={closeModal}>
                <OrderModal>{orderNumber}</OrderModal>
            </Modal>}

            {
                dataIsLoaded && background && (
                    <Routes>
                        <Route path="/ingredients/:anyIdNumber"
                               element={
                            <Modal closeModal={closeModal}>
                                <DetailedIngredientInfo/>
                            </Modal>} />
                    </Routes>
                )
            }
        </>
    );
}

export default App;
