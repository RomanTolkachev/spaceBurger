import styles from "./forgotPassworgPage.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {blockButton, unBlockButton} from "../../services/actions/user";
import {requestForgotPassCode} from "../../utils/api";

export const ForgotPasswordPage = () => {

    const [email, setEmail] = React.useState('email')
    const isRequestButtonLocked = useSelector(state => state.userInfo.isRequestButtonLocked);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = {
        email: email
    }

    const handlePassCodeSuccess = (message) => {
        localStorage.setItem('resetPasswordTokenSent', "yes");
        alert(message)
        navigate("/reset-password")
    }

    const handleSubmit = (e, form) => {
        e.preventDefault();
        dispatch(blockButton());
        requestForgotPassCode(form)
        .then(res => res.message === 'Reset email sent' ? handlePassCodeSuccess(res.message) : undefined)
        .catch(err => alert(err))
        .finally(() => dispatch(unBlockButton()))
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <form method='post' className={styles.form} style={{display: 'flex', flexDirection: 'column'}} onSubmit={e => handleSubmit(e, form)}>
                <Input
                    type={'text'}
                    placeholder={'email'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'укажите e-mail'}
                    extraClass="mb-6"
                    isIcon={true}
                />
                <div className={styles.button}>
                    <Button disabled={isRequestButtonLocked} htmlType="submit" type="primary" size="medium" extraClass="ml-2">
                        восстановить
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