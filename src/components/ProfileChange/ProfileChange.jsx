import styles from "../../pages/profilePage/profilePage.module.css";
import {PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const ProfileChange = () => {

    const [value, setValue] = React.useState('password')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
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
    )
}