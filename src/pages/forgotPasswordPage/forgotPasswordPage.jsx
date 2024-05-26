import styles from "./forgotPassworgPage.module.css"
import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const ForgotPasswordPage = () => {

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
                    extraClass="mb-2"
                    placeholder="Укажите e-mail"
                />
            </div>
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                    восстанивить
                </Button>
            </div>
            <div className={styles.remember}>
                вспомнили пароль? Войти
            </div>
        </section>
    )
}