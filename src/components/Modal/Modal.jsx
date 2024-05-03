import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";
import DetailedIngredientInfo from './DetailedIngredientInfo/DetailedIngredientInfo'
import OrderModal from "./OrderModal/OrderModal";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import burgerDataProps from '../../utils/propTypes'


const Modal = (props) => {
    const innerRef = React.useRef(null)

    // линтер ругается, что ему нужны handleClickOutside и handleClickEscape в зависимостях. Если их туда положить, то он начнет просить их
    // обернуть еще и в useCallback. но и без этих манипуляции слушатели удаляются из браузера. Возможно, если пропсы в открытой модалке будут меняться
    // т.е будет возможен перерендер открытой модалки, то добавать useCallback все-таки придется

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
            props.toggleModal()
        }
    }



    function handleClickEscape(e) {
        if (e.key === 'Escape') {
            props.toggleModal()
        }
    }

    return createPortal(
        (
            <div className={styles.overlay}>
                <div className={styles.inner} ref={innerRef}>
                    {props.children}
                    <div className={styles.close} onClick={props.toggleModal}>
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