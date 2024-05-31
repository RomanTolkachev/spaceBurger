
import {SEND_EMAIL_FINISHED, SEND_EMAIL_START, SET_USER} from "../services/actions/user";

export const registerUser = () => {
    fetch('https://norma.nomoreparties.space/api/auth/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: null,
            password: null,
            name: null,
        })
    })
        .then(res => res.json().then(parsed => parsed))
}

export const forgotPassword = (email, navigate) => {
    return function (dispatch) {
        dispatch({
            type: SEND_EMAIL_START
        })
        fetch('https://norma.nomoreparties.space/api/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: email,
            })
        })
        .then(res => res.json().then(parsed => {
            if (parsed.message === 'Reset email sent') {
                localStorage.setItem('resetPasswordTokenSent', "yes")
                navigate('/reset-password')
            }
        }))
        .finally(() => {
            dispatch({
                type: SEND_EMAIL_FINISHED
            });
        })
    }
}

export const resetPassword = (form, navigate) => {
    fetch('https://norma.nomoreparties.space/api/password-reset/reset',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            'password': form.password,
            'token': form.code
        })
    })
    .then(res => res.json().then(parsed => {
        if (parsed.success) {
            localStorage.removeItem('resetPasswordTokenSent')
            console.log(parsed);
            navigate('/login')
        }
    }))
}

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res);
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshedTokens = await refreshToken();
            options.headers.authorization = refreshedTokens.accessToken;
            const res = await fetch(url, options);
            if (res.ok) {
                return res.json()
            } else {
                return console.log("что то пошло не так")
            }
        } else {
            return console.log('что-то пошло не так при обновлении токена')
        }
    }
}


export const refreshToken = () => {
    fetch('https://norma.nomoreparties.space/api/auth/token', {
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
            let accessToken = parsed.accessToken.split('Bearer ')[1];
            let refreshToken = parsed.refreshToken;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            console.log('token refreshed')
            return parsed;
        } else {
            console.log(parsed)
        }
    })
}

export const getUserData = () => {
    fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    })
    .then(res => console.log(res))
}

export const amendUserData = () => {
    fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            email: 'tolkachevroman@bk.ru',
            password: '123',
            name: 'RomaInitial',
        })
    })
    .then(res => console.log(res))
}

export const loginRequest = () => {
    return function (dispatch) {
        fetchWithRefresh('https://norma.nomoreparties.space/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: "tolkachevroman@bk.ru",
                password: "123"
            })
        })
        .then((res) => {
            dispatch({
                type: SET_USER,
                email: res.user.email,
                name: res.user.name,
            })
        })
    }
}

export const logOut = () => {
    fetch('https://norma.nomoreparties.space/api/auth/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: `Bearer ${localStorage.getItem('refreshToken')}`,
        })
    })
        .then(res => res.json().then(parsed => parsed))
}