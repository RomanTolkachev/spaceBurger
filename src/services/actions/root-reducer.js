export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export const toggleModal = () => {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_MODAL
        })
    }
}