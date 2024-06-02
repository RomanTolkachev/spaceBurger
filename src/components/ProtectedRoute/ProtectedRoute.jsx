import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({onlyUnAuth = false, component}) => {
    const user = useSelector(state => state.userInfo.name)
    const isAuthChecked = useSelector(state => state.userInfo.isAuthChecked);
    const location = useLocation()

    if (!isAuthChecked) {
        return <h1>Загрузка...</h1>
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: {pathname: "/"} }
        return <Navigate to={from} />
    }

    if (onlyUnAuth === false && !user) {
        return <Navigate to="/login" state={{from: location}}/>
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({component}) => {
    return <ProtectedRoute onlyUnAuth={true} component={component}/>
}