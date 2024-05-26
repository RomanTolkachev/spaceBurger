import styles from "./loginPage.module.css"
import {Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
export const LoginPage = () => {

    const [value, setValue] = React.useState('password')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <section className={styles.frame}>
            <h1 className={styles.header}>вход</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className={styles.login}>
                    <PasswordInput
                        onChange={onChange}
                        value={value}
                        name={'login'}
                        icon="EditIcon"
                        placeholder={'Логин'}
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput
                        onChange={onChange}
                        value={value}
                        name={'password'}
                        icon="ShowIcon"
                    />
                </div>
            </div>
            <div className={styles.enter}>
                <Button htmlType="button" type="primary" size="medium">
                    войти
                </Button>
            </div>
            <div className={styles.register}>вы - новый пользователь? Зарегистрироваться</div>
            <div className={styles.forgot_pass}>забыли пароль? Восстановить пароль</div>
        </section>
    )
}