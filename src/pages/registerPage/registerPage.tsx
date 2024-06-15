import styles from './registerPage.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";
import {setUser} from "../../services/actions/user";
import {useDispatch} from "react-redux";
import {registerUser} from "../../utils/api";


export const RegisterPage: React.FC = () => {

    const [name, setName] = React.useState<string>('name');
    const [email, setEmail] = React.useState<string>('mail@blabla.ru');
    const [password, setPassword] = React.useState<string>('123456');
    const dispatch = useDispatch() // TODO: доработать на 5 спринте

    interface IForm {
        name: string,
        email: string,
        password: string,
    }

    const form: IForm = {
        name: name,
        email: email,
        password: password,
    }


    const handleSubmit = async (e: React.FormEvent, form: IForm) => {
        e.preventDefault();
        return registerUser(form) //@ts-ignore
        .then(res => {dispatch(setUser(res))})
        .catch(err => err.message === "User already exists" ? alert('пользователь с таким email уже существует') : undefined)
    }


    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>регистрация</h1>
            <form method='post' className={styles.input} onSubmit={async e => handleSubmit(e, form)}>
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    extraClass="mb-6"
                    placeholder="Имя"
                    type={'text'}
                />
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
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