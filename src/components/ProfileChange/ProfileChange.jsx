import styles from "./ProfileChange.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {amendUserData} from "../../utils/api";
import {requestAmendment} from "../../services/actions/user";

export const ProfileChange = () => {

    const dispatch = useDispatch()

    const storageUser = useSelector(state => state.userInfo.name);
    const storageEmail = useSelector(state => state.userInfo.email)

    const [name, setName] = React.useState(storageUser);
    const [email, setEmail] = React.useState(storageEmail);
    const [password, setPassword] = React.useState('');
    const [hasFormChanged, setHasFormChanged] = React.useState(true);


    const form = useMemo(() => {
        return {
            name: name,
            email: email,
            password: password
        }
    }, [name, email, password])

    // проверка, изменись ли данные формы
    useEffect(() => {
        const formString = JSON.stringify(form);
        const initialStateString = JSON.stringify({name: storageUser,email:storageEmail, password:''})
        formString !== initialStateString ? setHasFormChanged(false) : setHasFormChanged(true)
    }, [form, storageUser, storageEmail, password, hasFormChanged]);


    const handleSubmit = (e, form) => {
            e.preventDefault()
            return requestAmendment(form)
    }

    return (
        <form method='post' className={styles.form} onSubmit={async(e) => dispatch(await handleSubmit(e,form))}>
            <div className={styles.input} style={{display: 'flex', flexDirection: 'column'}}>
                <Input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    extraClass="mb-6"
                    placeholder="имя"
                />
                <EmailInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    extraClass="mb-6"
                    placeholder="e-mail"
                    isIcon={true}
                />
                <PasswordInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="новый пароль"
                />
            </div>
            <div className={styles.button}>
                <Button htmlType="submit" type="primary" size="medium" disabled={hasFormChanged}>
                    сохранить
                </Button>
            </div>
        </form>
    )
}