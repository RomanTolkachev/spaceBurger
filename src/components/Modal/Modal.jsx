import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {CLEAR_DETAILED_INGREDIENT_INFO} from "../../services/actions/ingredientDetailedInfo";
import {CLEAR_ORDER_NUMBER} from "../../services/actions/order";


const Modal = (props) => {
    const innerRef = React.useRef(null)
    const dispatch = useDispatch()

    function closeModal() {
        return function(dispatch) {
            dispatch({type: CLEAR_DETAILED_INGREDIENT_INFO});
            dispatch({type: CLEAR_ORDER_NUMBER});
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickEscape, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleClickEscape, true)
        }
    },[dispatch])

    function handleClickOutside(e) {
        if (!innerRef.current.contains(e.target)) {
            dispatch(closeModal())
        }
    }

    function handleClickEscape(e) {
        if (e.key === 'Escape') {
            dispatch(closeModal())
        }
    }

    return createPortal(
        (
            <div className={styles.overlay}>
                <div className={styles.inner} ref={innerRef}>
                    {props.children}
                    <div className={styles.close} onClick={() => dispatch(closeModal())}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </div>
        ),document.getElementById('portal')
    )
};

Modal.propTypes = {
    toggleModal: PropTypes.func,
    children: PropTypes.element
}

export default Modal;