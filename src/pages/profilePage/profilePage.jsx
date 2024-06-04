import styles from "./profilePage.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "../../components/Modal/Modal";
import {useDispatch} from "react-redux";
import {logOut} from "../../services/actions/user";

export const ProfilePage = ({component}) => {
    const dispatch = useDispatch()

    return (
        <section className={styles.frame}>
            <nav className={styles.navbar}>
                <NavLink to={'/profile'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>профиль</NavLink>
                <NavLink to={'/profile/history'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>история заказов</NavLink>
                <div className={styles.nav_item} onClick={() => dispatch(logOut())}>выход</div>
                <span className={styles.nav_info}>в этом разделе вы можете изменить свои персональные данные</span>
            </nav>
            {component}
        </section>
    )
}

Modal.propTypes = {
    component: PropTypes.element
}