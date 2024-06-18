import styles from "./resetPassworgPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {resetPassword} from "../../utils/api";
import {IRegisterUserResponse, IResetPassForm} from "../../utils/types";

export const ResetPasswordPage: React.FC = () => {

    const [password, setPassword] = React.useState<string>('password');
    const [code, setCode] = React.useState<string>('code')

    type TNavigate = ReturnType<typeof useNavigate>
    const navigate: TNavigate = useNavigate();

    useEffect((): void => {
        if (localStorage.getItem('resetPasswordTokenSent') !== 'yes') {
            navigate('/forgot-password')
        }
    }, []);


    const form: IResetPassForm = {
        password: password,
        code: code
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, form: IResetPassForm): void => {
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
            <form method='post' className={styles.input} style={{display: 'flex', flexDirection: 'column'}} onSubmit={(e: React.FormEvent<HTMLFormElement>) =>handleSubmit(e, form)}>
                <PasswordInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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