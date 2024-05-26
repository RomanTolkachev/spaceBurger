import styles from "./resetPassworgPage.module.css"
import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const ResetPasswordPage = () => {

    const [value, setValue] = React.useState('password')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <div className={styles.input} style={{display: 'flex', flexDirection: 'column'}}>
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите код из письма"
                />
            </div>
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                    сохранить
                </Button>
            </div>
            <div className={styles.remember}>
                вспомнили пароль? Войти
            </div>
        </section>
    )
}