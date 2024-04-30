import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";


const Modal = (props) => {
    const innerRef = React.useRef(null)

    useEffect(() => {
        document.addEventListener('click', clickOutside, true);
        document.addEventListener('keydown', clickEscape, true);
        return () => {
            document.removeEventListener('click', clickOutside, true);
            document.removeEventListener('keydown', clickEscape, true)
        }
    },[])

    function clickOutside(e) {
        if (!innerRef.current.contains(e.target)) {
            props.toggleModal()
        }
    }

    function clickEscape(e) {
        if (e.keyCode === 27) {
            props.toggleModal()
        }
    }


    return createPortal(
    (
        <div className={styles.overlay}>
            <div className={styles.inner} ref={innerRef}>
                я модалка
            </div>
        </div>
    ),document.getElementById('portal'))
}

export default Modal