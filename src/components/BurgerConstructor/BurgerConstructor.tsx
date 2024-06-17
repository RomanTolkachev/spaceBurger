import styles from './BurgerConstructor.module.css'
import {YaLibraryCard} from "./ConstructorCard/YaLIbraryCard";
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useDrop } from "react-dnd";
import {handleClearCart, handleDrop} from "../../services/actions/burgerCounstructor";
import { EmptyCard } from './ConstructorCard/EmptyCard'
import {handleOrderSuccess, orderSentFiled, orderSentFinished, startSendOrder} from "../../services/actions/order";
import {useNavigate} from "react-router-dom";
import {sendOrderRequest} from "../../utils/api";
import {IRootState} from "../../services/reducers/root-reducer";
import {IBurgerConstructorStore} from "../../services/reducers/burgerCounstructor";

const BurgerConstructor: React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const commonCart: IBurgerConstructorStore = useSelector((state: IRootState) => state.burgerConstructor)
    const currentFilling = useSelector((state: IRootState) => state.burgerConstructor.filling)
    const currentBun = useSelector((state: IRootState) => state.burgerConstructor.bun)
    const isOrderLocked: boolean = useSelector((state: IRootState) => state.orderStore.isOrderButtonLocked);
    const user: string | null = useSelector((state: IRootState) => state.userInfo.name);

    type TNavigate = ReturnType<typeof useNavigate>
    const navigate: TNavigate = useNavigate()

    const [{isDragging}, dropRef] = useDrop({
        accept: ['main', 'sauce'],
        drop(droppableItem): void { //@ts-ignore
            dispatch(handleDrop(droppableItem))
        },
        collect: (monitor) => ({
            isDragging: monitor.isOver()
        })
    })

    const [{isBunDragging} , bunRef] = useDrop({
        accept: 'bun',
        drop(droppableItem): void { //@ts-ignore
            dispatch(handleDrop(droppableItem))
        },
        collect: (monitor) => ({
            isBunDragging: monitor.isOver()
        })
    })

    const [{isBottomBunDragging} , bottomBunRef] = useDrop({
        accept: 'bun',
        drop(droppableItem): void { //@ts-ignore
            dispatch(handleDrop(droppableItem))
        },
        collect: (monitor) => ({
            isBottomBunDragging: monitor.isOver()
        })
    })

    const totalPrice: number = useMemo<number>(() => {
        let total: number = 0;
        for (let key in commonCart) {
            commonCart[key].forEach(item => total+=item.price)
        }
        return total;
    }, [commonCart])

    const ids: string[] = useMemo(() => {
        const ids: string[] = [];
        for (let key in commonCart) {
            commonCart[key].forEach(item => {
                ids.push(item._id)
            })
        }
        return ids;
    }, [commonCart])

    const handleSendOrder = (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault()
        if (!user) {
            return navigate('/login')
        } else { //@ts-ignore
            dispatch(startSendOrder());
            sendOrderRequest(ids)
            .then(res => { //@ts-ignore
                if (res.success) { //@ts-ignore
                    dispatch(handleOrderSuccess(res)); //@ts-ignore
                    dispatch(handleClearCart())
                } else alert('заказ не создан')
            })
            .catch(() => orderSentFiled()) //@ts-ignore
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
                        onClick={e => handleSendOrder(e)}>
                        Оформить заказ
                    </Button>
                </div>
            </div>}
        </>
    )
}


export default BurgerConstructor;