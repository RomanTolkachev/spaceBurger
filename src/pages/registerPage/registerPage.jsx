import styles from './registerPage.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";


export const RegisterPage = () => {

    const [name, setName] = React.useState('name');
    const [email, setEmail] = React.useState('mail@blabla.ru');
    const [password, setPassword] = React.useState('123456');

    const form = {
        name: name,
        email: email,
        password: password,
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>регистрация</h1>
            <form method='post' className={styles.input} style={{display: 'flex', flexDirection: 'column'}} onSubmit={(e) => {e.preventDefault();console.log(form)}}>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    extraClass="mb-6"
                    placeholder="Имя"
                    type={'text'}
                />
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    extraClass="mb-6"
                    placeholder="E-mail"
                    type={'email'}
                />
                <PasswordInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-15"
                    placeholder="Пароль"
                />
                <div className={styles.button}>
                    <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <div className={styles.register}>
                <span>уже зарегистрированы?</span>
                <Link className={styles.link} to="/login">Войти</Link>
            </div>
        </section>
    )
}