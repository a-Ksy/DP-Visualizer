/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import * as actionTypes from "./actionTypes";
import updateObject from "../utils/utility";

const initialState = {
  loading: false,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return updateObject(state, { loading: true });
    case actionTypes.HIDE_LOADING:
      return updateObject(state, { loading: false });
    case actionTypes.SET_DATABASES:
      return updateObject(state, { databases: action.payload });
    case actionTypes.SET_DATABASE:
      return updateObject(state, { database: action.database });
    case actionTypes.SET_COLUMNS:
      return updateObject(state, { columns: action.payload });
    case actionTypes.SET_COLUMN_VALUES:
      return updateObject(state, { columnValues: action.payload });
    case actionTypes.SET_COUNTS:
      return updateObject(state, { histogram: action.payload });
    default:
      return state;
  }
};

export default dataReducer;
