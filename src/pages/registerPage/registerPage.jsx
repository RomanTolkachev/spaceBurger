import styles from './registerPage.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";
import {setUser} from "../../services/actions/user";
import {useDispatch} from "react-redux";
import {registerUser} from "../../utils/api";


export const RegisterPage = () => {

    const [name, setName] = React.useState('name');
    const [email, setEmail] = React.useState('mail@blabla.ru');
    const [password, setPassword] = React.useState('123456');
    const dispatch = useDispatch()

    const form = {
        name: name,
        email: email,
        password: password,
    }


    const handleSubmit = async (e, form) => {
        e.preventDefault();
        return registerUser(form)
        .then(res => {dispatch(setUser(res))})
        .catch(err => err.message === "User already exists" ? alert('пользователь с таким email уже существует') : undefined)
    }


    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>регистрация</h1>
            <form method='post' className={styles.input} style={{display: 'flex', flexDirection: 'column'}} onSubmit={async e => handleSubmit(e, form)}>
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