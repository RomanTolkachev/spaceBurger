import styles from "./profilePage.module.css"
import React from "react";
import {NavLink, useMatch} from "react-router-dom";
import {letMeLeave} from "../../services/actions/user";
import {useDispatchTyped} from "../../services/hooks/hooks";

interface IProfilePage {
    component?: React.ReactElement | null
}


export const ProfilePage: React.FunctionComponent<IProfilePage> = ({component}) => {
    const dispatch = useDispatchTyped()

    const handleLeave = () => {
        dispatch(letMeLeave())
    }

    const info: React.ReactNode = (
        useMatch('/profile/history')
            ? "в этом разделе вы можете посмотреть историю заказов"
            : "в этом разделе вы можете изменить свои персональные данные"
    )

    return (
        <section className={styles.frame}>
            <nav className={styles.navbar}>
                <NavLink to={'/profile'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>профиль</NavLink>
                <NavLink to={'/profile/history'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>история заказов</NavLink>
                <div className={styles.nav_item} onClick={handleLeave}>выход</div>
                <span className={styles.nav_info}>{info}</span>
            </nav>
            {component}
        </section>
    )
}
