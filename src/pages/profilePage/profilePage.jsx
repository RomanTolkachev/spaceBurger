import styles from "./profilePage.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "../../components/Modal/Modal";

export const ProfilePage = ({component}) => {
    return (
        <section className={styles.frame}>
            <nav className={styles.navbar}>
                <NavLink to={'/profile'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>профиль</NavLink>
                <NavLink to={'/profile/history'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>история заказов</NavLink>
                <NavLink to={'/profile/logout'} end className={({isActive}) => isActive ? styles.nav_item_active : styles.nav_item}>выход</NavLink>
                <span className={styles.nav_info}>в этом разделе вы можете изменить свои персональные данные</span>
            </nav>
            {component}
        </section>
    )
}

Modal.propTypes = {
    component: PropTypes.element
}