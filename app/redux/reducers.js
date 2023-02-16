import notesReducer from "./noteSlice";
import { combineReducers } from "redux";

export default combineReducers({
  notes: notesReducer,
});
