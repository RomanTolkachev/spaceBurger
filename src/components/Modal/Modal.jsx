import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {clearOrderNumber} from "../../services/actions/order";
import {useDispatch, useSelector} from "react-redux";
import {clearDetailedInfo} from "../../services/actions/ingredientDetailedInfo";


const Modal = (props) => {
    const innerRef = React.useRef(null);
    const navigate = useNavigate();
    const {modalContent} = useSelector(state => state.orderStore);
    const dispatch = useDispatch()

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickEscape, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleClickEscape, true)
        }
    },[]);

    const closeModal = () => {
        if (modalContent) {
            dispatch(clearOrderNumber());
        } else {
            dispatch(clearDetailedInfo()) ;
            return navigate(-1)
        }
    }

    function handleClickOutside(e) {
        if (!innerRef.current.contains(e.target)) {
            closeModal()
        }
    }

    function handleClickEscape(e) {
        if (e.key === 'Escape') {
            closeModal()
        }
    }

    return createPortal(
        (
            <div className={styles.overlay}>
                <div className={styles.inner} ref={innerRef}>
                    {props.children}
                    <div className={styles.close} onClick={closeModal}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </div>
        ),document.getElementById('portal')
    )
};

Modal.propTypes = {
    children: PropTypes.element
}

export default Modal;