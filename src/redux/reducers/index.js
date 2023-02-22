import {combineReducers} from "redux";

import {UserReducer} from "./userReducer";
import {TaskReducer} from "./taskReducer";

export default combineReducers({
    UserReducer: UserReducer,
    TaskReducer: TaskReducer
});