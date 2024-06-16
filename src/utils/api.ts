import {
    IForgotPassForm,
    IGetUserResponse,
    IIngredient,
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

export const refreshToken = () => {
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

//@ts-ignore
export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (error) { //@ts-ignore
        if (error.message === "jwt expired") {
            const refreshedTokens = await refreshToken(); //@ts-ignore
            options.headers.authorization = refreshedTokens.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res)
        } else {
            return Promise.reject(error)
        }
    }
}

export const getUserData = () => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
}
//@ts-ignore
export const amendUserData = (form) => {
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
//@ts-ignore
export const loginRequest = (form) => {
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
    .then(checkResponse)
}

export const logOutRequest = () => {
    return fetch(`${BASE_URL}/auth/logout`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    })
    .then(checkResponse)
}