export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";
export const SWITCH_TAB = 'SWITCH_TAB'

export function fetchIngredients(url: string) {
    return function (dispatch) {
        dispatch({
            type: FETCH_INGREDIENTS
        })
        fetch(url)
            // .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
            .then(res => {
                if (res.ok) {
                    return res.json()
                        .then(parsed => {
                            dispatch({
                                type: FETCH_INGREDIENTS_SUCCESS,
                                fetched: parsed.data
                            })
                        })
                } else {
                    dispatch({
                        type: FETCH_INGREDIENTS_FAILED,
                        error: res.json()
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_INGREDIENTS_FAILED,
                    error: "404"
                })
            })
    }
}

export const setCurrentTab = (tab) => {
    return function (dispatch) {
        dispatch({
            type: SWITCH_TAB,
            current: tab
        })
    }
}