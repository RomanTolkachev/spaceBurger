import {BurgerIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './NavButton.module.css'

const NavButton = (props) => {
    return (
        <a href="#" className={`${styles.navButton} pl-5 pr-5 pb-3 pt-3`}>{props.icon}{props.children}</a>
    )
}

export default NavButton