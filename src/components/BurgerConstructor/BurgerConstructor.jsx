import styles from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes, {oneOf} from "prop-types";
import Modal from '../Modal/Modal.jsx'
import React from "react";
import OrderModal from "../Modal/OrderModal/OrderModal";
import {useSelector, useDispatch} from "react-redux";
import { useDrop } from "react-dnd";
import {handleDelete, handleDrop} from "../../services/actions/burgerCounstructor";
import {ConstructorCard} from './ConstructorCard/ConstructorCard'


const BurgerConstructor = (props) => {

    const dispatch = useDispatch();

    const [{isDragging}, dropRef] = useDrop({
        accept: 'main',
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


    const currentFilling = useSelector(state => state.burgerConstructor.filling)
    const currentBun = useSelector(state => state.burgerConstructor.bun)

    const [isModalOpen, setModalOpen] = React.useState(false);

    function toggleModal() {
        setModalOpen(!isModalOpen)
    }

    return (
        <>
            {<div className={styles.constructor_wrapper}>
                <div className={`${styles.item} ${isBunDragging ? styles.dragging : ""}`} ref={bunRef}>
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
                        <ConstructorCard>перетащите сюда ингредиенты</ConstructorCard>}
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
                <div className={styles.item}>
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
                        <ConstructorCard>нижняя часть булки</ConstructorCard>}
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