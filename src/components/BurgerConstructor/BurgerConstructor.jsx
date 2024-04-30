import styles from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from '../Modal/Modal.jsx'
import React from "react";

const BurgerConstructor = (props) => {
const [isModalOpen, setModalOpen] = React.useState(false);
function toggleModal() {
    setModalOpen(!isModalOpen)
}

    return (
        <>
            {props.hasError && <div className={styles.constructor_wrapper}>попробуйте перезагрузить страницу</div>}
            {!props.isDataLoaded && <div className={styles.constructor_wrapper}>загрузка...</div>}
            { props.burgerData && <div className={styles.constructor_wrapper}>
                <div className={styles.item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={props.burgerData[0].image_mobile}
                    />
                </div>
                <ul className={`${styles.chosen_items} custom-scroll`}>
                    {props.burgerData.map(listItem => (
                        <li key={listItem.id}>
                            <p className={styles.drag_icon}>
                                <DragIcon type="primary"/>
                            </p>
                            <ConstructorElement
                                text="Краторная булка N-200i (верх)"
                                price={50}
                                thumbnail={listItem.image_mobile}
                            />
                        </li>
                    ))}
                </ul>
                <div className={styles.item}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={props.burgerData[0].image_mobile}
                    />
                </div>
                <div className={styles.order}>
                    <p className={styles.total_price}>610 <CurrencyIcon type="primary"/></p>
                    <Button htmlType="button" type="primary" size="large" onClick={toggleModal}>
                        Оформить заказ
                    </Button>
                </div>
                {isModalOpen && <Modal toggleModal={toggleModal}/>}
            </div>}
        </>
    )
}

// works well
BurgerConstructor.propTypes = {
    burgerData: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
    }))
}

export default BurgerConstructor;