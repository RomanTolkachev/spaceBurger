import {useSelector} from "react-redux";

export const ProtectedRoute = ({onlyUnAuth = false, component}) => {
    const user = useSelector(state => state.userInfo.name)
    const isAuthenticated = useSelector(state => state.userInfo.isAuthenticated)

}