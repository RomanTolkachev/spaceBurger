export const FETCH_INGREDIENTS = "FETCH_INGREDIENTS";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export function fetchWithAction(url) {
    return function(dispatch) {
        dispatch({
            type: FETCH_INGREDIENTS
        })
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(parsed => {
                dispatch({
                    type: FETCH_INGREDIENTS_SUCCESS,
                    fetched: parsed.data
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_INGREDIENTS_FAILED,
                    error: "404"
                })
            })
    }
}