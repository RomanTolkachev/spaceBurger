import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {IRootState} from "../../services/reducers/root-reducer";

interface IProtectedRoute {
    onlyUnAuth?: boolean
    component: React.ReactElement
}

const ProtectedRoute: React.FunctionComponent<IProtectedRoute> = ({onlyUnAuth = false, component}) => {
    const user = useSelector((state: IRootState) => state.userInfo.name)
    const isAuthChecked = useSelector((state: IRootState) => state.userInfo.isAuthChecked);
    const location: { state?: {from?: { pathname: string }}} = useLocation()

    if (!isAuthChecked) {
        return <h1>Загрузка...</h1>
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: {pathname: "/"} }
        return <Navigate to={from!} />
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{from: location}}/>
    }

    return component;
}

export const OnlyAuth: React.FunctionComponent<IProtectedRoute> = ProtectedRoute;
export const OnlyUnAuth = ({component}: { component: React.ReactElement }) => {
    return <ProtectedRoute onlyUnAuth={true} component={component}/>
}
