import styles from "./YaLibraryCard.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {handleDelete} from "../../../services/actions/burgerCounstructor";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {handleSwap} from "../../../services/actions/burgerCounstructor";
import PropTypes from "prop-types";

export function YaLibraryCard(props) {

    const dispatch = useDispatch();
    const ref = useRef(null);

    const [ ,drop] = useDrop({
        accept: 'card',
        hover: (item,  monitor) => {
            if (item.id === props.id || !ref.current) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (item.id < props.id && hoverClientY < hoverMiddleY) {
                return;
            }
            if (item.id > props.id && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch(handleSwap(item.id, props.id));
            item.id = props.id;
        }
    })

    const [{isDragging}, drag] = useDrag({
        type: 'card',
        item: () => {
            return {id: props.id, index: props.id}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li ref={ref} style={{opacity}} className={styles.item}>
            <p className={styles.drag_icon}>
                <DragIcon type="primary"/>
            </p>
            <ConstructorElement
                text={props.listItem.name}
                price={props.listItem.price}
                thumbnail={props.listItem.image_mobile}
                handleClose={() => dispatch(handleDelete(props.listItem.dynamicId))}
            />
        </li>
    )
}

YaLibraryCard.propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    listItem: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        dynamicId: PropTypes.string.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
    }),
}
