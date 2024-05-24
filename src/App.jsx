import { Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/homePage";
import {useEffect} from "react";
import {fetchIngredients} from "./services/actions/burgerIngredients";
import {useDispatch} from "react-redux";
const url = "https://norma.nomoreparties.space/api/ingredients"

function App() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchIngredients(url))
    },[]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}

export default App;
