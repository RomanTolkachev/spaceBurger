import styles from './Modal.module.css'
import {createPortal} from "react-dom";
import React, {useEffect} from "react";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
    closeModal: () => void
    children: React.ReactNode
}

const Modal: React.FunctionComponent<IModalProps> = (props: IModalProps) => {
    const innerRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        
    function handleClickOutside(e: MouseEvent) {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
            props.closeModal()
        }
    }

    function handleClickEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            props.closeModal()
        }
    }

        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickEscape, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleClickEscape, true)
        }
    },[props]);


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
        ),document.getElementById('portal') as HTMLElement
    )
};

export default Modal;