import styles from "./ProfileChange.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../services/actions/user";
import {amendUserData} from "../../utils/api";
import {IRootState} from "../../services/reducers/root-reducer";
import {IGetUserResponse, IRegisterForm} from "../../utils/types";

export const ProfileChange: React.FC = () => {

    const dispatch = useDispatch()

    const storageUser: string = useSelector((state: IRootState) => state.userInfo.name!);
    const storageEmail: string  = useSelector((state: IRootState) => state.userInfo.email!)

    const [name, setName] = React.useState<string>(storageUser);
    const [email, setEmail] = React.useState<string>(storageEmail);
    const [password, setPassword] = React.useState<string>('');
    const [hasFormChanged, setHasFormChanged] = React.useState<boolean>(true);


    const form = useMemo<IRegisterForm>(() => {
        return {
            name: name,
            email: email,
            password: password
        }
    }, [name, email, password])

    // проверка, изменись ли данные формы
    useEffect((): void => {
        const formString: string = JSON.stringify(form);
        const initialStateString: string = JSON.stringify({name: storageUser,email:storageEmail, password:''})
        formString !== initialStateString ? setHasFormChanged(false) : setHasFormChanged(true)
    }, [form, storageUser, storageEmail, password, hasFormChanged]);

    const handleSuccessAmendUser = (res: IGetUserResponse) => {
        alert('данные успешно обновлены'); //@ts-ignore
        return dispatch(setUser(res))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, form: IRegisterForm) => {
            e.preventDefault();
            return amendUserData(form)
            .then((res: IGetUserResponse) => res.success ? handleSuccessAmendUser(res) : undefined)
            .catch(err => alert(err))
    }

    return (
        <form method='post' className={styles.form} onSubmit={e => handleSubmit(e, form)}>
            <div className={styles.input}>
                <Input
                    onPointerEnterCapture={((event: PointerEvent): void => {})}
                    onPointerLeaveCapture={((event: PointerEvent): void => {})}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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