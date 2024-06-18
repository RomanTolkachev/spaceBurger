import styles from "./loginPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FormEvent} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginRequest} from "../../utils/api";
import {login} from "../../services/actions/user";
import {ILoginForm, IRegisterUserResponse} from "../../utils/types";

export const LoginPage: React.FunctionComponent = () => {

    const [email, setEmail] = React.useState<string>('tolkachevroman@bk.ru')
    const [password, setPassword] = React.useState<string>('RomA1992')
    const dispatch = useDispatch() // TODO: для 5 спринта


    const form: ILoginForm = {
        email: email,
        password: password
    }

    const handleLoginSuccess = (res: IRegisterUserResponse) => {
        localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken) //@ts-ignore
        return dispatch(login(res))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, form: ILoginForm): Promise<void> => {
        e.preventDefault();
        loginRequest(form)
        .then((res: IRegisterUserResponse) => {
            if (res.success) {
                return handleLoginSuccess(res);
            } else {
                return alert(res)
            }
        })
        .catch(err => alert(err))
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>вход</h1>
            <form method='post' className={styles.form} onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e, form)}>
                <div className={styles.login}>
                    <Input
                        onPointerEnterCapture={((event: PointerEvent): void => {})}
                        onPointerLeaveCapture={((event: PointerEvent): void => {})}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        icon="EditIcon"
                        placeholder={'e-mail'}
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        icon="ShowIcon"
                    />
                </div>
            <div className={styles.enter}>
                <Button htmlType="submit" type="primary" size="medium">
                    войти
                </Button>
            </div>
            </form>
            <div className={styles.register}>
                <span>вы - новый пользователь?</span>
                <Link className={styles.link} to="/register">Зарегистрироваться</Link>
            </div>
            <div className={styles.register}>
                <span>забыли пароль?</span>
                <Link className={styles.link} to="/forgot-password">Восстановить пароль</Link>
            </div>
        </section>
    )
}