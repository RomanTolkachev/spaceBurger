import styles from "./forgotPassworgPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";

export const ForgotPasswordPage = () => {

    const [email, setEmail] = React.useState('email')
    const inputRef = React.useRef(null);
    const isRequestButtonLocked = useSelector(state => state.userInfo.isRequestButtonLocked);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <div className={styles.input} style={{display: 'flex', flexDirection: 'column'}}>
                <Input
                    type={'text'}
                    placeholder={'email'}
                    onChange={e => setEmail(e.target.value)}
                    icon={null}
                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'укажите e-mail'}
                    size={'default'}
                    extraClass="ml-1"
                />
            </div>
            <div className={styles.button}>
                <Button disabled={isRequestButtonLocked} htmlType="button" type="primary" size="medium" extraClass="ml-2" onClick={() => dispatch(forgotPassword(email, navigate))}>
                    восстановить
                </Button>
            </div>
            <div className={styles.register}>
                <span>вспомнили пароль?</span>
                <Link className={styles.link} to="/login">Войти</Link>
            </div>
        </section>
    )
}