import styles from "./resetPassworgPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {resetPassword} from "../../utils/api";

export const ResetPasswordPage = () => {

    const [password, setPassword] = React.useState('password');
    const [code, setCode] = React.useState('code')

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('resetPasswordTokenSent') !== 'yes') {
            navigate('/forgot-password')
        }
    }, []);

    const form = {
        password: password,
        code: code
    }

    const handleSubmit = (e, form) => {
        e.preventDefault();
        resetPassword(form)
        .then(() => {
                localStorage.removeItem('resetPasswordTokenSent')
                navigate('/login')
        })
        .catch(err => err.message === "Incorrect reset token" ? alert("неверный код из письма") : undefined)
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <form method='post' className={styles.input} style={{display: 'flex', flexDirection: 'column'}} onSubmit={e =>handleSubmit(e, form)}>
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
                <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
                        сохранить
                    </Button>
                </div>
            </form>
            <div className={styles.register}>
                <span>вспомнили пароль?</span>
                <Link className={styles.link} to="/login">Войти</Link>
            </div>
        </section>
    )
}