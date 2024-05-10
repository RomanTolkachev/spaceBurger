import styles from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from '../Modal/Modal.jsx'
import React from "react";
import OrderModal from "../Modal/OrderModal/OrderModal";
import {useSelector, useDispatch} from "react-redux";

const BurgerConstructor = (props) => {

    const currentIngredients = useSelector(state => state.burgerConstructor)

    const [isModalOpen, setModalOpen] = React.useState(false);

    function toggleModal() {
        setModalOpen(!isModalOpen)
    }

    return (
        <>
            { <div className={styles.constructor_wrapper}>
                <div className={styles.item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={currentIngredients[0].image_mobile}
                    />
                </div>
                <ul className={`${styles.chosen_items} custom-scroll`}>
                    {currentIngredients.map((listItem, key) => (
                        <li key={key}>
                            <p className={styles.drag_icon}>
                                <DragIcon type="primary"/>
                            </p>
                            <ConstructorElement
                                text={listItem.name}
                                price={listItem.price}
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
                        thumbnail={currentIngredients[0].image_mobile}
                    />
                </div>
                <div className={styles.order}>
                    <p className={styles.total_price}>610 <CurrencyIcon type="primary"/></p>
                    <Button htmlType="button" type="primary" size="large" onClick={toggleModal}>
                        Оформить заказ
                    </Button>
                </div>
                {isModalOpen && <Modal toggleModal={toggleModal}>
                    <OrderModal/>
                </Modal>}
            </div>}
        </>
    )
}


export default BurgerConstructor;