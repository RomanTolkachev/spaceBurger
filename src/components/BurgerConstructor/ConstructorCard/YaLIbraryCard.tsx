import styles from "./YaLibraryCard.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {handleDelete} from "../../../services/actions/burgerCounstructor";
import {useDispatch} from "react-redux";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {handleSwap} from "../../../services/actions/burgerCounstructor";
import {IConstructorIngredient} from "../../../utils/types";

interface IYaLibraryCard {
    id: number
    index: number
    listItem: IConstructorIngredient
}

export const YaLibraryCard: React.FunctionComponent<IYaLibraryCard> = (props ) =>  {

    const dispatch = useDispatch(); //TODO: поправить на 5 спринте
    const ref: React.RefObject<HTMLLIElement> = useRef<HTMLLIElement>(null);

    const [ ,drop] = useDrop({
        accept: 'card',
        hover: (item: {id: number},  monitor): void => {
            if (item.id === props.id || !ref.current) {
                return;
            }

            const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY: number = (hoverBoundingRect!.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: XYCoord | null = monitor.getClientOffset();
            const hoverClientY: number  =  clientOffset!.y - hoverBoundingRect.top;

            if (item.id < props.id && hoverClientY < hoverMiddleY) {
                return;
            }
            if (item.id > props.id && hoverClientY > hoverMiddleY) {
                return;
            }
            //@ts-ignore
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
    const opacity: 0 | 1 = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li ref={ref} style={{opacity}} className={styles.item}>
            <p className={styles.drag_icon}>
                <DragIcon type="primary"/>
            </p>
            <ConstructorElement
                text={props.listItem.name}
                price={props.listItem.price}
                thumbnail={props.listItem.image_mobile} //@ts-ignore
                handleClose={() => dispatch(handleDelete(props.listItem.dynamicId))}
            />
        </li>
    )
}

