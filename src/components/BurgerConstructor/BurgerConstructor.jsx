import styles from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal.jsx'
import React, {useEffect, useMemo} from "react";
import OrderModal from "../Modal/OrderModal/OrderModal";
import {useSelector, useDispatch} from "react-redux";
import { useDrop } from "react-dnd";
import {handleDelete, handleDrop} from "../../services/actions/burgerCounstructor";
import {ConstructorCard} from './ConstructorCard/ConstructorCard'
import { sendOrder } from "../../services/actions/order";
const url = 'https://norma.nomoreparties.space/api/orders'


const BurgerConstructor = () => {

    const commonCart = useSelector(state => state.burgerConstructor)
    const currentFilling = useSelector(state => state.burgerConstructor.filling)
    const currentBun = useSelector(state => state.burgerConstructor.bun)
    const dispatch = useDispatch();
    const isOrderLocked = useSelector(state => state.orderStore.isOrderButtonLocked);
    const orderNumber = useSelector(state => state.orderStore.modalContent);

    const [{isDragging}, dropRef] = useDrop({
        accept: ['main', 'sauce'],
        drop(droppableItem) {
            dispatch(handleDrop(droppableItem))
        },
        collect: (monitor) => ({
            isDragging: monitor.isOver()
        })
    })

    const [{isBunDragging} , bunRef] = useDrop({
        accept: 'bun',
        drop(droppableItem) {
            dispatch(handleDrop(droppableItem))
        },
        collect: (monitor) => ({
            isBunDragging: monitor.isOver()
        })
    })

    const [{isBottomBunDragging} , bottomBunRef] = useDrop({
        accept: 'bun',
        drop(droppableItem) {
            dispatch(handleDrop(droppableItem))
        },
        collect: (monitor) => ({
            isBottomBunDragging: monitor.isOver()
        })
    })

    const totalPrice = useMemo(() => {
        let total = 0;
        for (let key in commonCart) {
            commonCart[key].forEach(item => total+=item.price)
        }
        return total;
    }, [commonCart])

    const ids = useMemo(() => {
        const ids = [];
        for (let key in commonCart) {
            commonCart[key].forEach(item => {
                ids.push(item._id)
            })
        }
        return ids;
    }, [commonCart])

    const [isModalOpen, setModalOpen] = React.useState(false);

    function toggleModal() {
        setModalOpen(!isModalOpen)
    }


    return (
        <>
            {<div className={styles.constructor_wrapper}>
                <div className={`${styles.item} ${isBunDragging || isBottomBunDragging ? styles.dragging : ""}`} ref={bunRef}>
                    {currentBun.length > 0 ? (
                            <div className={styles.top_bun}>
                                <p className={styles.drag_icon}>
                                    <DragIcon type="primary"/>
                                </p>
                                <ConstructorElement
                                    text={currentBun[0].name}
                                    price={currentBun[0].price}
                                    thumbnail={currentBun[0].image_mobile}
                                />
                            </div>) :
                        <ConstructorCard>перетащите сюда булку</ConstructorCard>}
                </div>
                <ul className={`${styles.chosen_items} custom-scroll ${isDragging ? styles.dragging : ""}` } ref={dropRef}>
                    {currentFilling.length > 0 ? (currentFilling.map((listItem, key) => (
                            <li key={key}>
                                <p className={styles.drag_icon}>
                                    <DragIcon type="primary"/>
                                </p>
                                <ConstructorElement
                                    text={listItem.name}
                                    price={listItem.price}
                                    thumbnail={listItem.image_mobile}
                                    handleClose={() => dispatch(handleDelete(listItem.dynamicId))}
                                />
                            </li>)))
                        : (<ConstructorCard>перетащите сюда ингредиенты</ConstructorCard>)
                    }
                </ul>
                <div className={`${styles.item} ${isBunDragging || isBottomBunDragging ? styles.dragging : ""}`} ref={bottomBunRef}>
                    {currentBun.length > 0 ? (
                            <div className={styles.top_bun}>
                                <p className={styles.drag_icon}>
                                    <DragIcon type="primary"/>
                                </p>
                                <ConstructorElement
                                    text={currentBun[0].name}
                                    price={currentBun[0].price}
                                    thumbnail={currentBun[0].image_mobile}
                                />
                            </div>) :
                        <ConstructorCard>перетащите сюда булку</ConstructorCard>}
                </div>
                <div className={styles.order}>
                    <p className={styles.total_price}>{totalPrice} <CurrencyIcon type="primary"/></p>
                    <Button
                        disabled={
                            isOrderLocked
                            || currentFilling.length === 0
                            || currentBun.length === 0
                        }
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => dispatch(sendOrder(url,ids))}>
                        Оформить заказ
                    </Button>
                </div>
                {orderNumber && <Modal toggleModal={toggleModal}>
                    <OrderModal>{orderNumber}</OrderModal>
                </Modal>}
            </div>}
        </>
    )
}


export default BurgerConstructor;