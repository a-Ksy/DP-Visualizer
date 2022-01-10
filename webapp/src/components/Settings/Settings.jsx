import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getColumnValues,
  getCountOfColumn,
  getCountOfColumnWithCondition,
} from "../../store/data";
import "./Settings.css";
import Button from "../Button/Button";
import { useState } from "react";

const Settings = (props) => {
  const {
    retrieveColumnValues,
    retrieveCountOfColumn,
    retrieveCountOfColumnWithCondition,
    columns,
    columnValues,
    firstColumn,
    setFirstColumn,
    firstColumnVal,
    setFirstColumnVal,
    secondColumn,
    setSecondColumn,
    dbName,
  } = props;
  const [showSecondaryColumn, setShowSecondaryColumn] = useState(false);

  useEffect(
    () => retrieveCountOfColumn(dbName, firstColumn),
    [dbName, firstColumn]
  );
  useEffect(
    () => retrieveColumnValues(dbName, firstColumn),
    [dbName, firstColumn]
  );
  useEffect(
    () =>
      retrieveCountOfColumnWithCondition(
        dbName,
        firstColumn,
        firstColumnVal,
        secondColumn
      ),
    [
      dbName,
      firstColumn,
      firstColumnVal,
      secondColumn,
      retrieveCountOfColumnWithCondition,
    ]
  );

  let secondaryColumnOptions = null;

  if (showSecondaryColumn) {
    secondaryColumnOptions = columns.filter((column) => column !== firstColumn);
  }

  const secondaryColumn = (
    <div className="d-flex justify-content-start">
      <div>
        <label for="columnSelection" class="form-label">
          Select a/an {firstColumn} value
        </label>
        <select
          id="columnSelection"
          class="form-select"
          onChange={(e) => setFirstColumnVal(e.target.value)}
          value={firstColumnVal}
        >
          {columnValues?.map((column) => (
            <option value={column}>{column}</option>
          ))}
        </select>
      </div>
      <div>
        <label for="columnSelection" class="form-label">
          Select a secondary column
        </label>
        <select
          id="columnSelection"
          class="form-select"
          onChange={(e) => setSecondColumn(e.target.value)}
          value={secondColumn}
        >
          {secondaryColumnOptions?.map((column) => (
            <option value={column}>{column}</option>
          ))}
        </select>
      </div>
      <Button
        type="transparent"
        size="sm"
        onClick={() => setShowSecondaryColumn(false)}
      >
        Remove secondary column
      </Button>
    </div>
  );

  return (
    <div className="Settings">
      <div className="d-flex justify-content-start">
        <div className="form d-flex justify-content-start">
          <div>
            <label for="columnSelection" class="form-label">
              Select a column
            </label>
            <select
              id="columnSelection"
              class="form-select"
              onChange={(e) => setFirstColumn(e.target.value)}
              value={firstColumn}
            >
              {columns?.map((column) => (
                <option value={column}>{column} </option>
              ))}
            </select>
          </div>
          {showSecondaryColumn ? (
            secondaryColumn
          ) : (
            <Button
              type="transparent"
              size="sm"
              onClick={() => setShowSecondaryColumn(true)}
            >
              Add a secondary column
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  columns: state.data.columns,
  columnValues: state.data.columnValues,
  dbName: state.data.database,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveColumnValues: (dbName, column) =>
    dispatch(getColumnValues(dbName, column)),
  retrieveCountOfColumn: (dbName, column) =>
    dispatch(getCountOfColumn(dbName, column)),
  retrieveCountOfColumnWithCondition: (dbName, column1, column1Val, column2) =>
    dispatch(
      getCountOfColumnWithCondition(dbName, column1, column1Val, column2)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
