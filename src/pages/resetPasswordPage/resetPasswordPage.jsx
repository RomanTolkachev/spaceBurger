import styles from "./resetPassworgPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {resetPassword} from "../../utils/api";

export const ResetPasswordPage = () => {

    const [password, setPassword] = React.useState('password');
    const [code, setCode] = React.useState('password')

    const navigate = useNavigate()

    if (localStorage.getItem('resetPasswordTokenSent') !== 'yes') {
        navigate('/forgot-password')
    }

    const form = {
        password,
        code
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <div className={styles.input} style={{display: 'flex', flexDirection: 'column'}}>
                <PasswordInput
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                <Input
                    onChange={e => {
                        setCode(e.target.value)
                    }}
                    value={code}
                    name={'code'}
                    extraClass="mb-6"
                    placeholder="Введите код из письма"
                />
            </div>
            <div className={styles.button}>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2"
                        onClick={() => resetPassword(form, navigate)}>
                    сохранить
                </Button>
            </div>
            <div className={styles.register}>
                <span>вспомнили пароль?</span>
                <Link className={styles.link} to="/login">Войти</Link>
            </div>
        </section>
    )
}