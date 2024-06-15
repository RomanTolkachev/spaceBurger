import styles from "./forgotPassworgPage.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {blockButton, unBlockButton} from "../../services/actions/user";
import {requestForgotPassCode} from "../../utils/api";
import { IRootState } from "../../services/reducers/root-reducer";

export const ForgotPasswordPage: React.FC = () => {

    const [email, setEmail] = React.useState<string>('email')
    const isRequestButtonLocked = useSelector((state: IRootState) => state.userInfo.isRequestButtonLocked);
    const dispatch = useDispatch(); // TODO: разобраться на 5 спринте

    type TNavigate = ReturnType<typeof useNavigate>
    const navigate: TNavigate = useNavigate();

    interface IForm {
        email: string
    }
    const form: IForm = {
        email: email
    }

    const handlePassCodeSuccess = (message: string): void => {
        localStorage.setItem('resetPasswordTokenSent', "yes");
        alert(message)
        navigate("/reset-password")
    }

    const handleSubmit = (e: FormEvent, form: IForm) => {
        e.preventDefault(); //@ts-ignore
        dispatch(blockButton()); //TODO: диспатч для 5 спринта
        requestForgotPassCode(form)
        .then(res => res.message === 'Reset email sent' ? handlePassCodeSuccess(res.message) : undefined)
        .catch(err => alert(err)) //@ts-ignore
        .finally(() => dispatch(unBlockButton())) //TODO: диспатч для 5 спринта
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <form method='post' className={styles.form} onSubmit={e => handleSubmit(e, form)}>
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    type={'text'}
                    placeholder={'email'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'укажите e-mail'}
                    extraClass="mb-6"
                    icon={undefined}
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