import styles from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from '../Modal/Modal.jsx'
import React from "react";
import OrderModal from "../Modal/OrderModal/OrderModal";

const BurgerConstructor = (props) => {

    const orderDetails = true; //*пока нет данных о заказе, пусть будет костыль, чтобы в модалке рендерился компонент заказа*//

    const [isModalOpen, setModalOpen] = React.useState(false);

    function toggleModal() {
        setModalOpen(!isModalOpen)
    }

    return (
        <>
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
                    {props.burgerData.map((listItem, key) => (
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
                        thumbnail={props.burgerData[0].image_mobile}
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