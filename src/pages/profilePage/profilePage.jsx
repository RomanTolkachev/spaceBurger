import styles from "./profilePage.module.css"
import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const ProfilePage = () => {

    const [value, setValue] = React.useState('password')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <section className={styles.frame}>
            <nav className={styles.navbar}>
                <div className={styles.nav_item}>профиль</div>
                <div className={styles.nav_item}>история заказов</div>
                <div className={styles.nav_item}>выход</div>
                <span className={styles.nav_info}>в этом разделе вы можете изменить свои персональные данные</span>
            </nav>
            <div>
                <div className={styles.input} style={{display: 'flex', flexDirection: 'column'}}>
                    <PasswordInput
                        onChange={onChange}
                        value={value}
                        name={'name'}
                        extraClass="mb-6"
                        placeholder="имя"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={value}
                        name={'login'}
                        extraClass="mb-6"
                        placeholder="логин"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={value}
                        name={'password'}
                        extraClass="mb-6"
                        placeholder="пароль"
                    />
                </div>
            </div>

        </section>
    )
}