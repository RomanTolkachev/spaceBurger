import styles from "./loginPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FormEvent} from "react";
import {Link} from "react-router-dom";
import {letMeLogin} from "../../services/actions/user";
import {ILoginForm} from "../../utils/types";
import {useDispatchTyped} from "../../services/hooks/hooks";

export const LoginPage: React.FunctionComponent = () => {

    const [email, setEmail] = React.useState<string>('tolkachevroman@bk.ru')
    const [password, setPassword] = React.useState<string>('RomA1992')
    const dispatch = useDispatchTyped()


    const form: ILoginForm = {
        email: email,
        password: password
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>, form: ILoginForm): Promise<void> => {
        e.preventDefault();
        dispatch(letMeLogin(form))
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