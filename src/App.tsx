import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import React, {useCallback, useEffect} from "react";
import {getIngredients, handleFailedFetch, setIngredients, startFetch} from "./services/actions/burgerIngredients";
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
import {useDispatchTyped , useSelectorTyped} from "./services/hooks/hooks";
import {FeedPage} from "./pages/feed/feedPage";
import {OrdersQueue} from "./components/feed/OrdersQueue/OrdersQueue";
import {DetailedOrderInfo} from "./components/Modal/DetailedOrderInfo/DetailedOrderInfo";
import {clearOrderDetailedInfo} from "./services/actions/orderDetailedInfo";
import {OrderPage} from "./pages/OrderPage/OrderPage";
import {AppThunk} from "./utils/types";

function App():React.JSX.Element {

    const dispatch = useDispatchTyped();

    type TNavigate = ReturnType<typeof useNavigate>
    const navigate: TNavigate = useNavigate()
    const location: {state: { background: string }} = useLocation();
    const background: string = location.state && location.state.background;

    const dataIsLoaded = useSelectorTyped((state) => state.burgerIngredients.ingredients);
    const orderNumber = useSelectorTyped((state) => state.orderStore.modalContent);

    useEffect(() => {
        dispatch(getIngredients());
    },[]);

    useEffect((): void => {
        if (localStorage.getItem('accessToken')) {
            getUserData()
            .then(res => dispatch(setUser(res)))
            .catch((): void => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .finally((): void => {
                dispatch(finishAuthStatus())
            })
        } else {
            dispatch(finishAuthStatus())
        }
    }, [dispatch])

    const {modalContent} = useSelectorTyped((state) => state.orderStore);
    const {info}  = useSelectorTyped((state) => state.detailedOrderInfo);


    const closeModal = useCallback(() => {
        if (modalContent) {
            dispatch(clearOrderNumber());
        } else if (info) {
            dispatch(clearOrderDetailedInfo())
            return navigate(-1)
        }
        else {
            dispatch(clearDetailedInfo());
            return navigate(-1)
        }
    },[dispatch, info, modalContent, navigate])

    return (
        <>
            <AppHeader/>
            {dataIsLoaded &&
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:detailedOrderNumber" element={<OrderPage />} />
                <Route path="ingredients/:anyIdNumber" element={<IngredientPage />} />
                <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
                <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
                <Route path="/profile/history/:detailedOrderNumber" element={<OnlyAuth component={<OrderPage />} />} />
                <Route path="/profile">
                    <Route path="" element={<OnlyAuth component={<ProfilePage component={<ProfileChange/>} />} />}></Route>
                    <Route path="history" element={<OnlyAuth component={<ProfilePage component={<OrdersQueue/>} />} />}>
                </Route>
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
                        <Route path="/feed/:detailedOrderNumber" element={
                            <Modal closeModal={closeModal}>
                                <DetailedOrderInfo />
                            </Modal>
                        }/>
                        <Route path="/profile/history/:detailedOrderNumber" element={
                            <Modal closeModal={closeModal}>
                                <DetailedOrderInfo />
                            </Modal>
                        }/>
                    </Routes>
                )
            }
        </>
    );
}

export default App;
