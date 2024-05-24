import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";


const Modal = (props) => {
    const innerRef = React.useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickEscape, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleClickEscape, true)
        }
    },[])

    function handleClickOutside(e) {
        if (!innerRef.current.contains(e.target)) {
            navigate(-1)
        }
    }

    function handleClickEscape(e) {
        if (e.key === 'Escape') {
            navigate(-1)
        }
    }

    return createPortal(
        (
            <div className={styles.overlay}>
                <div className={styles.inner} ref={innerRef}>
                    {props.children}
                    <div className={styles.close} onClick={() => navigate(-1)}>
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