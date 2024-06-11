import styles from './AppHeader.module.css'
import NavButton from './NavButton/NavButton'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useMatch,} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

const AppHeader: React.FC = () => {

    // @ts-ignore
    const userdata = useSelector(state => state.userInfo.name)

    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <ul className={styles.navigation}>
                    <li className="">
                        <NavLink to="/" className={({isActive}): string => isActive ? styles.active : styles.link}>
                            <NavButton icon={<BurgerIcon type={useMatch('/') ? "primary" : "secondary"}/>}>Конструктор</NavButton>
                        </NavLink>
                        <NavLink to="/orders" className={({isActive}): string => isActive ? styles.active : styles.link}>
                            <NavButton icon={<ListIcon type={useMatch('/orders') ? "primary" : "secondary"}/>}>лента заказов</NavButton>
                        </NavLink>
                    </li>
                    <li className={styles.logo}><a href="#"><Logo/></a></li>
                    <NavLink to="/profile" className={({isActive}): string => isActive ? styles.active : styles.link}>
                        <li><NavButton icon={<ProfileIcon type={useMatch('/profile') ? "primary" : "secondary"}/>}>{userdata ? userdata : "личный кабинет"}</NavButton></li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader