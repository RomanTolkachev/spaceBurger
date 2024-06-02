import {SEND_EMAIL_FINISHED, SEND_EMAIL_START} from "../services/actions/user";

export const registerUser = (form) => {
    return fetch('https://norma.nomoreparties.space/api/auth/register',{
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
    .then((parsed) => {
        localStorage.setItem("refreshToken", parsed.refreshToken);
        localStorage.setItem("accessToken", parsed.accessToken.split('Bearer ')[1]);
        return parsed;
    })
    .catch(err => {
        if (err.message === "User already exists") {
            alert('пользователь с таким email уже существует');
        }
        return Promise.reject(err)
    })
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
    return fetch('https://norma.nomoreparties.space/api/password-reset/reset',{
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
    return fetch('https://norma.nomoreparties.space/api/auth/token', {
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
            console.log('token refreshed')
            return parsed;
        } else {
            return Promise.reject(parsed)
        }
    })
}

export const checkResponse = async (res) =>  {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        console.log('сработал try в fetchWithRefresh')
        return await checkResponse(res);
    } catch (error) {
        console.log('сработал catch в fetchWithRefresh')
        if (error.message === "jwt expired") {
            console.log('сработал if в fetchWithRefresh')
            const refreshedTokens = await refreshToken();
            console.log(refreshedTokens)
            options.headers.authorization = refreshedTokens.accessToken;
            const res = await fetch(url, options);
            console.log(res)
            return await checkResponse(res)
        } else {
            return () => {Promise.reject(error); console.log('стработал else в fetchWithRefresh')}
        }
    }
}

export const getUserData = () => {
    return fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => {console.log("срабоатал then в getUserData",res); return res}) // undefined из checkResponse
    .catch((res) =>  Promise.reject(res))
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

export const loginRequest = (form) => {
    return fetchWithRefresh('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password
        })
    })
    .then((res) => {
        if (res.success) {
            localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', res.refreshToken)
            return res
        }
    })
}

export const logOutRequest = () => {
    return fetch('https://norma.nomoreparties.space/api/auth/logout',{
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
        console.log("срабоатал then в logOut, токены удалены",res); return res
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })

}