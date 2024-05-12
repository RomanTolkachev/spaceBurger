export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const LOCK_ORDER_BUTTON = 'LOCK_ORDER_BUTTON';

export const toggleModal = () => {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_MODAL
        })
    }
}