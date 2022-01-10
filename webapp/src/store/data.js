import * as actionTypes from "./actionTypes";
import { apiGetColumns, apiGetCountOfColumn, apiGetColumnValues, apiGetCountOfColumnWithCondition, apiGetDatabases } from "../api/api";

export const setDatabases = (payload) => ({
  type: actionTypes.SET_DATABASES,
  payload,
});

export const setDatabase = (database) => ({
  type: actionTypes.SET_DATABASE,
  database,
});

export const getDatabases = () => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_LOADING });
  return apiGetDatabases(
    (response) => {
      dispatch(setDatabases(response.data));
      dispatch({ type: actionTypes.HIDE_LOADING });
      return response;
    },
    (err) => {
      dispatch({ type: actionTypes.HIDE_LOADING });
    }
  );
};


export const setColumns = (payload) => ({
  type: actionTypes.SET_COLUMNS,
  payload,
});

export const getColumns = (dbName) => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_LOADING });
  return apiGetColumns(
    dbName,
    (response) => {
      dispatch(setColumns(response.data));
      dispatch({ type: actionTypes.HIDE_LOADING });
      return response;
    },
    (err) => {
      dispatch({ type: actionTypes.HIDE_LOADING });
    }
  );
};

export const setColumnValues = (payload) => ({
  type: actionTypes.SET_COLUMN_VALUES,
  payload,
});

export const getColumnValues = (dbName, column) => (dispatch) => {
  return apiGetColumnValues(
    dbName,
    column,
    (response) => {
      dispatch(setColumnValues(response.data));
      return response;
    },
    (err) => {
    }
  );
};

export const setCountOfColumn = (payload) => ({
  type: actionTypes.SET_COUNTS,
  payload,
});

export const getCountOfColumn = (dbName, column) => (dispatch) => {
  return apiGetCountOfColumn(
    dbName,
    column,
    (response) => {
      dispatch(setCountOfColumn(response.data));
      return response;
    },
    (err) => {
    }
  );
};

export const getCountOfColumnWithCondition = (dbName, column1, column1Val, column2) => (dispatch) => {
  return apiGetCountOfColumnWithCondition(
    dbName,
    column1,
    column1Val,
    column2,
    (response) => {
      dispatch(setCountOfColumn(response.data));
      return response;
    },
    (err) => {
    }
  );
};