import styles from "./forgotPassworgPage.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {requestCode} from "../../services/actions/user";

export const ForgotPasswordPage = () => {

    const [email, setEmail] = React.useState('email')
    const isRequestButtonLocked = useSelector(state => state.userInfo.isRequestButtonLocked);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (e, form) => {
        e.preventDefault();
        return requestCode(form, navigate)
    }

    const form = {
        email: email
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <form method='post' className={styles.form} style={{display: 'flex', flexDirection: 'column'}} onSubmit={async(e) => dispatch(handleSubmit(e,form))}>
                <EmailInput
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