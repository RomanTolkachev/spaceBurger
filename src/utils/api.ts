import {
    IForgotPassForm,
    IIngredient, ILoginForm, ILogOut,
    IOrderResponse,
    IRegisterForm,
    IRegisterUserResponse,
    IRequestForgotPassCode, IResetPassForm, IResetPassResponse
} from "./types";

export const BASE_URL: "https://norma.nomoreparties.space/api" = "https://norma.nomoreparties.space/api";

export const fetchIngredients = (): Promise<IIngredient[]> => {
    return fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse<IIngredient[]>)
}

export const sendOrderRequest = (arrayOfIds: string[]): Promise<IOrderResponse> => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients: arrayOfIds})
    })
    .then(checkResponse<IOrderResponse>)
}

export const registerUser = (form: IRegisterForm): Promise<IRegisterUserResponse> => {
    return fetch(`${BASE_URL}/auth/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name,
        })
    })
    .then(checkResponse<IRegisterUserResponse>)
    .then((parsed: IRegisterUserResponse): IRegisterUserResponse => {
        localStorage.setItem("refreshToken", parsed.refreshToken);
        localStorage.setItem("accessToken", parsed.accessToken.split('Bearer ')[1]);
        console.log(parsed)
        return parsed;
    })
}

export const checkResponse = async <T>(res: Response): Promise<T> =>  {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestForgotPassCode = (form: IForgotPassForm): Promise<IRequestForgotPassCode> => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: form.email,
        })
    })
    .then(checkResponse<IRequestForgotPassCode>)
}

export const resetPassword = (form: IResetPassForm): Promise<IResetPassResponse> => {
    return fetch(`${BASE_URL}/password-reset/reset`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'password': form.password,
            'token': form.code
        })
    })
    .then(checkResponse<IResetPassResponse>)
}

export const refreshToken = (): Promise<IRegisterUserResponse | never>  => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'token': localStorage.getItem('refreshToken')
        })
    })
    .then(checkResponse<IRegisterUserResponse>)
    .then((parsed: IRegisterUserResponse): IRegisterUserResponse | Promise<never> => {
        if (parsed.success) {
            localStorage.setItem("refreshToken", parsed.refreshToken); //@ts-ignore
            localStorage.setItem("accessToken", parsed.accessToken.split('Bearer ')[1]);
            return parsed;
        } else {
            return Promise.reject(parsed)
        }
    })
}

interface IOptions {
    method: string,
    headers?: { ["Content-Type"]: string, authorization: string } | undefined,
    body?: string
}

export const fetchWithRefresh = async <T>(url: string, options: IOptions): Promise<T> => {
    try {
        const res: Response = await fetch(url, options);
        return await checkResponse(res);
    } catch (error: any) {
        if (error.message === "jwt expired") {
            const refreshedTokens: IRegisterUserResponse = await refreshToken();
            if (options.headers) {options.headers.authorization = refreshedTokens.accessToken}
            const res: Response = await fetch(url, options);
            return await checkResponse(res)
        } else {
            return Promise.reject(error)
        }
    }
}

export const getUserData = <T>(): Promise<T> => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
}

export const amendUserData = (form: IRegisterForm): Promise<IRegisterUserResponse> => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name,
        })
    })
}


export const loginRequest = (form: ILoginForm): Promise<ILoginForm> => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password
        })
    })
    .then(checkResponse<ILoginForm>)
}

export const logOutRequest = (): Promise<ILogOut> => {
    return fetch(`${BASE_URL}/auth/logout`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    })
    .then(checkResponse<ILogOut>)
}