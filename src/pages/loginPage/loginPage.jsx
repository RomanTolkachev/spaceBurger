import styles from "./loginPage.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";
import {login} from "../../services/actions/user";
import {useDispatch} from "react-redux";
export const LoginPage = () => {

    const [email, setEmail] = React.useState('tolkachevroman@bk.ru')
    const [password, setPassword] = React.useState('RomA1992')
    const dispatch = useDispatch()

    const form = {
        email: email,
        password: password
    }

    const handleSubmit = (e, form) => {
        e.preventDefault();
        return login(form);
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>вход</h1>
            <form method='post' className={styles.form} style={{display: 'flex', flexDirection: 'column'}} onSubmit={async(e) => dispatch(await handleSubmit(e, form))}>
                <div className={styles.login}>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        icon="EditIcon"
                        placeholder={'e-mail'}
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
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