import styles from './registerPage.module.css'
import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";


export const RegisterPage = () => {

    const [value, setValue] = React.useState('password')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>регистрация</h1>
            <div className={styles.input} style={{display: 'flex', flexDirection: 'column'}}>
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Имя"
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="E-mail"
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Пароль"
                />
            </div>
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                    Зарегистрироваться
                </Button>
            </div>
            <div className={styles.register}>
                <span>уже зарегистрированы?</span>
                <Link className={styles.link} to="/login">Войти</Link>
            </div>
        </section>
    )
}