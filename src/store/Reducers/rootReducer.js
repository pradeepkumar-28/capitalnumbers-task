import { combineReducers } from "redux";
import tableDataReducer from "./tableDataReducer";

export const rootReducer = combineReducers({
  EMPLOYEE_DATA: tableDataReducer,
});
