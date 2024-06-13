import styles from './BurgerConstructor.module.css'
import {YaLibraryCard} from "./ConstructorCard/YaLIbraryCard";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useDrop } from "react-dnd";
import {handleClearCart, handleDrop} from "../../services/actions/burgerCounstructor";
import { EmptyCard } from './ConstructorCard/EmptyCard'
import {
    handleOrderSuccess,
    orderSentFiled,
    orderSentFinished,
    startSendOrder
} from "../../services/actions/order";
import {useNavigate} from "react-router-dom";
import {sendOrderRequest} from "../../utils/api";

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const commonCart = useSelector(state => state.burgerConstructor)
    const currentFilling = useSelector(state => state.burgerConstructor.filling)
    const currentBun = useSelector(state => state.burgerConstructor.bun)
    const isOrderLocked = useSelector(state => state.orderStore.isOrderButtonLocked);
    const user = useSelector(state => state.userInfo.name);
    const navigate = useNavigate()

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

    const handleSendOrder = () => {
        if (!user) {
            return navigate('/login')
        } else {
            dispatch(startSendOrder());
            sendOrderRequest(ids)
            .then(res => {
                if (res.success) {
                    dispatch(handleOrderSuccess(res));
                    dispatch(handleClearCart())
                } else alert('заказ не создан')
            })
            .catch(() => orderSentFiled())
            .finally(() => dispatch(orderSentFinished()))
        }
    }

    return (
        <>
            {<div className={styles.constructor_wrapper}>
                <div className={`${styles.item} ${isBunDragging || isBottomBunDragging ? styles.dragging : ""}`} ref={bunRef}>
                    {currentBun.length > 0 ? (
                            <div className={styles.top_bun}>
                                <ConstructorElement
                                    text={`${currentBun[0].name} (Верх)`}
                                    price={currentBun[0].price}
                                    thumbnail={currentBun[0].image_mobile}
                                    type={'top'}
                                />
                            </div>) :
                        <EmptyCard type={'top'} >перетащите сюда булку</EmptyCard>}
                </div>
                <ul className={`${styles.chosen_items} custom-scroll ${isDragging ? styles.dragging : ""}` } ref={dropRef}>
                    {currentFilling.length > 0 ? (currentFilling.map((listItem, index) => (
                            <YaLibraryCard key={listItem.dynamicId} id={index} index={index} listItem={listItem}/>)))
                        : (<EmptyCard type={'middle'}>перетащите сюда ингредиенты</EmptyCard>)
                    }
                </ul>
                <div className={`${styles.item} ${isBunDragging || isBottomBunDragging ? styles.dragging : ""}`} ref={bottomBunRef}>
                    {currentBun.length > 0 ? (
                            <div className={styles.top_bun}>
                                <ConstructorElement
                                    text={`${currentBun[0].name} (Низ)`}
                                    price={currentBun[0].price}
                                    thumbnail={currentBun[0].image_mobile}
                                    type={'bottom'}
                                />
                            </div>) :
                        <EmptyCard type={'bottom'}>перетащите сюда булку</EmptyCard>}
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
                        onClick={handleSendOrder}>
                        Оформить заказ
                    </Button>
                </div>
            </div>}
        </>
    )
}


export default BurgerConstructor;