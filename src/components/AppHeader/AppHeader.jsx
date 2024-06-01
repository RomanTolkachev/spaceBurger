import styles from './AppHeader.module.css'
import NavButton from './NavButton/NavButton.jsx'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useMatch,} from "react-router-dom";

const AppHeader = () => {

    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <ul className={styles.navigation}>
                    <li className="">
                        <NavLink to="/" className={({isActive}) => isActive ? styles.active : styles.link}>
                            <NavButton icon={<BurgerIcon type={useMatch('/') ? "primary" : "secondary"}/>}>конструктор</NavButton>
                        </NavLink>
                        <NavLink to="/orders" className={({isActive}) => isActive ? styles.active : styles.link}>
                            <NavButton icon={<ListIcon type={useMatch('/orders') ? "primary" : "secondary"}/>}>лента заказов</NavButton>
                        </NavLink>
                    </li>
                    <li className={styles.logo}><a href="#"><Logo/></a></li>
                    <NavLink to="/profile" className={({isActive}) => isActive ? styles.active : styles.link}>
                        <li><NavButton icon={<ProfileIcon type={useMatch('/profile') ? "primary" : "secondary"}/>}>личный кабинет</NavButton></li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader