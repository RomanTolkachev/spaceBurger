import styles from './registerPage.module.css'
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";
import {setUser} from "../../services/actions/user";
import {useDispatch} from "react-redux";
import {registerUser} from "../../utils/api";
import {IRegisterForm, IRegisterUserResponse} from "../../utils/types";


export const RegisterPage: React.FunctionComponent = () => {

    const [name, setName] = React.useState<string>('name');
    const [email, setEmail] = React.useState<string>('mail@blabla.ru');
    const [password, setPassword] = React.useState<string>('123456');
    const dispatch = useDispatch() // TODO: доработать на 5 спринте


   const form: IRegisterForm = {
        name: name,
        email: email,
        password: password,
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, form: IRegisterForm) => {
        e.preventDefault();
        return registerUser(form) //@ts-ignore
        .then((res: IRegisterUserResponse): void => {dispatch(setUser(res))}) //@ts-ignore // TODO: исправить сейчас
        .catch(err => err.message === "User already exists" ? alert('пользователь с таким email уже существует') : undefined)
    }


    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>регистрация</h1>
            <form method='post' className={styles.input} onSubmit={async (e: React.FormEvent<HTMLFormElement>) => handleSubmit(e, form)}>
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    extraClass="mb-6"
                    placeholder="Имя"
                    type={'text'}
                />
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    extraClass="mb-6"
                    placeholder="E-mail"
                    type={'email'}
                />
                <PasswordInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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