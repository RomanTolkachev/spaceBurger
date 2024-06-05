import {login} from "../services/actions/user";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const registerUser = (form) => {
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
    .then(checkResponse)
    .then(parsed => {
        localStorage.setItem("refreshToken", parsed.refreshToken);
        localStorage.setItem("accessToken", parsed.accessToken.split('Bearer ')[1]);
        return parsed;
    })
}

export const checkResponse = async (res) =>  {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const forgotPassword = (form, navigate) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: form.email,
        })
    })
    .then(checkResponse)
    .then(parsed => {
        if (parsed.message === 'Reset email sent') {
            localStorage.setItem('resetPasswordTokenSent', "yes")
            alert('код отправлен на указанный email')
        }
        navigate("/reset-password")
        return parsed;
    })
    .catch(() => {
        console.log('сработал кэтч в api.forgotPassword')
    })
}

export const resetPassword = (form, navigate) => {
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
    .then(checkResponse)
    .then(parsed => {
        localStorage.removeItem('resetPasswordTokenSent')
        console.log(parsed);
        navigate('/login')
    })
    .catch ((err) => {
        if (err.message === "Incorrect reset token") {
            alert("неверный код из письма")
        }
    })
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
    .then(checkResponse)
    .then(parsed => {
        if (parsed.success) {
            localStorage.setItem("refreshToken", parsed.refreshToken);
            localStorage.setItem("accessToken", parsed.accessToken.split('Bearer ')[1]);
            return parsed;
        } else {
            return Promise.reject(parsed)
        }
    })
}


export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshedTokens = await refreshToken();
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
    .then(res => res)
    .catch((res) =>  Promise.reject(res))
}

export const amendUserData = (form) => {
    return fetchWithRefresh(`${BASE_URL}/api/auth/user`, {
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
    .then((res) => {
        if (res.success) {
            alert('данные успешно обновлены')
            return res.user
        }
    })
    .catch((err) => {
        return Promise.reject(err)
    })
}

export const loginRequest = (form, dispatch) => {
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
    .then(res => res.json())
    .then((parsed) => {
        if (parsed.success) {
            localStorage.setItem('accessToken', parsed.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', parsed.refreshToken)
            return dispatch(login(parsed.user));
        } else {
            alert(parsed.message)
        }
    })
    .catch((err) => {
        console.log(err)
    })
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
    .then(res => {
        if (res.success) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
        return res
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}