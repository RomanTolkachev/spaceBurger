export const GET_DETAILED_INGREDIENT_INFO = 'GET_DETAILED_INGREDIENT_INFO';
export const CLEAR_DETAILED_INGREDIENT_INFO = 'CLEAR_DETAILED_INGREDIENT_INFO'

export const configureDetailedInfo = (info) => {
    return function(dispatch) {
        return dispatch({
            type: GET_DETAILED_INGREDIENT_INFO,
            info: info
        })
    }
}

export const clearDetailedInfo = () => {
    return function(dispatch) {
        return dispatch({
            type: CLEAR_DETAILED_INGREDIENT_INFO,
        })
    }
}