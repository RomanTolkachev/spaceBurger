
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

export const requestForgotPassCode = (form) => {
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
}

export const resetPassword = (form) => {
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
}

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