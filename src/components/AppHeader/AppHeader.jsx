import styles from './AppHeader.module.css'
import NavButton from './NavButton/NavButton.jsx'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <ul className={styles.navigation}>
                    <li className="">
                        <NavButton icon={<BurgerIcon type="primary"/>}>конструктор</NavButton>
                        <NavButton icon={<ListIcon type="primary"/>}>лента заказов</NavButton>
                    </li>
                    <li className={styles.logo}><a href="#"><Logo /></a></li>
                    <li><NavButton icon={<ProfileIcon type="primary"/>}>личный кабинет</NavButton></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader