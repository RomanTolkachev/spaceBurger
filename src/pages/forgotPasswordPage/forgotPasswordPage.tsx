import styles from "./forgotPassworgPage.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {blockButton, unBlockButton} from "../../services/actions/user";
import {requestForgotPassCode} from "../../utils/api";
import {IForgotPassForm, IRequestForgotPassCode} from "../../utils/types";
import {useDispatchTyped, useSelectorTyped} from "../../services/hooks/hooks";

export const ForgotPasswordPage: React.FunctionComponent = () => {

    const [email, setEmail] = React.useState<string>('email')
    const isRequestButtonLocked: boolean = useSelectorTyped((state) => state.userInfo.isRequestButtonLocked);
    const dispatch = useDispatchTyped();

    type TNavigate = ReturnType<typeof useNavigate>
    const navigate: TNavigate = useNavigate();



    const form: IForgotPassForm = {
        email: email
    }

    const handlePassCodeSuccess = (message: string): void => {
        localStorage.setItem('resetPasswordTokenSent', "yes");
        alert(message)
        navigate("/reset-password")
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>, form: IForgotPassForm): void => {
        e.preventDefault();
        dispatch(blockButton());
        requestForgotPassCode(form)
        .then((res: IRequestForgotPassCode): void => res.message === 'Reset email sent' ? handlePassCodeSuccess(res.message) : undefined)
        .catch(err => alert(err))
        .finally(() => dispatch(unBlockButton()))
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>восстановление пароля</h1>
            <form method='post' className={styles.form} onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e, form)}>
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    type={'text'}
                    placeholder={'email'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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