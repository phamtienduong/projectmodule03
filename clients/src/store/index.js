import { reducer } from "./reducer/reducer";
import{createStore,combineReducers} from "redux"
const combine = combineReducers({
    reducer
})
export const store = createStore(combine);