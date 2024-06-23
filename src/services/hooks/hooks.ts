import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {TAppDispatch, TAppThunk} from "../../utils/types";
import {IRootState} from "../reducers/root-reducer";

export const useSelectorTyped: TypedUseSelectorHook<IRootState> = selectorHook;
export const useDispatchTyped = () => dispatchHook<TAppDispatch>();