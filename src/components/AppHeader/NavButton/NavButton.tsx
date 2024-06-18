import styles from './NavButton.module.css'
import React, {PropsWithChildren} from "react";


interface INavButtonTypes {
    icon: React.ReactElement,
}

const NavButton:React.FunctionComponent<PropsWithChildren<INavButtonTypes>> = ({icon, children}) => {
    return (
        <span className={`${styles.navButton} pl-5 pr-5 pb-3 pt-3`}>
            {icon}
            {children}
        </span>
    )
}

export default NavButton

