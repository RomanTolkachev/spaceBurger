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
        if (e.keyCode === 27) {
            props.toggleModal()
        }
    }

    return createPortal(
        (
            <div className={styles.overlay}>
                <div className={styles.inner} ref={innerRef}>
                    {props.orderDetails && <OrderModal />}
                    {props.detailedInfo && <DetailedIngredientInfo details={props.detailedInfo}/>}
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
    orderDetails: PropTypes.bool, //* потом указать точнее, пока там только bool*//
    detailedInfo: burgerDataProps
}

export default Modal