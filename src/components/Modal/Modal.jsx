import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = (props) => {
    const innerRef = React.useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickEscape, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleClickEscape, true)
        }
    },[]);

    function handleClickOutside(e) {
        if (!innerRef.current.contains(e.target)) {
            props.closeModal()
        }
    }

    function handleClickEscape(e) {
        if (e.key === 'Escape') {
            props.closeModal()
        }
    }

    return createPortal(
        (
            <div className={styles.overlay}>
                <div className={styles.inner} ref={innerRef}>
                    {props.children}
                    <div className={styles.close} onClick={props.closeModal}>
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