import styles from './AppHeader.module.css'
import NavButton from './NavButton/NavButton.jsx'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {amendUserData, getUserData, loginRequest, refreshToken} from "../../utils/api";
import {useDispatch} from "react-redux";


const AppHeader = () => {

    const dispatch = useDispatch()

    // const register = () => {
    //     fetch("https://norma.nomoreparties.space/api/auth/register",
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json;charset=utf-8',
    //             },
    //             body: JSON.stringify({
    //                 email: "tolkachevroman@bk.rururu",
    //                 password: "holalaaaaaaa",
    //                 name: "hop12345sdf"
    //             })
    //         })
    //         .then(res => {
    //             console.log(res)
    //         })
    // };




    return (
        <header className={styles.header}>
            <nav className={styles.container}>
                <ul className={styles.navigation}>
                    <li className="">
                        <Link to="/" className={styles.link}>
                            <NavButton icon={<BurgerIcon type="primary"/>}>конструктор</NavButton>
                        </Link>
                        <NavButton icon={<ListIcon type="primary"/>}>лента заказов</NavButton>
                    </li>
                    <li className={styles.logo}><a href="#"><Logo/></a></li>
                    <Link to="/profile" className={styles.link}>
                        <li><NavButton icon={<ProfileIcon type="primary"/>}>личный кабинет</NavButton></li>
                    </Link>
                    {/*<button onClick={() => dispatch(loginRequest())}>залогиниться</button>*/}
                    {/*<button onClick={getUserData}>получить данные</button>*/}
                    {/*<button onClick={amendUserData}>изменить данные</button>*/}
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader