import styles from "./forgotPassworgPage.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";
import {requestCode} from "../../services/actions/user";
import {IForgotPassForm, TNavigate} from "../../utils/types";
import {useDispatchTyped, useSelectorTyped} from "../../services/hooks/hooks";

export const ForgotPasswordPage: React.FunctionComponent = () => {

    const [email, setEmail] = React.useState<string>('email')
    const isRequestButtonLocked: boolean = useSelectorTyped((state) => state.userInfo.isRequestButtonLocked);
    const dispatch = useDispatchTyped();

    const navigate: TNavigate = useNavigate();

    const form: IForgotPassForm = {
        email: email
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>, form: IForgotPassForm): void => {
        e.preventDefault();
        dispatch(requestCode(form, navigate))
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