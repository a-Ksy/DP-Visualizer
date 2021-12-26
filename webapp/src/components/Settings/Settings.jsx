import { useEffect } from "react";
import { connect } from "react-redux";
import { getColumnValues, getCountOfColumn } from "../../store/data";
import "./Settings.css";
import Button from "../Button/Button";
import { useState } from "react";

const Settings = (props) => {
  const {
    retrieveColumnValues,
    retrieveCountOfColumn,
    columns,
    columnValues,
    firstColumn,
    setFirstColumn,
  } = props;
  const [showSecondaryColumn, setShowSecondaryColumn] = useState(false);

  useEffect(() => retrieveCountOfColumn(firstColumn), [firstColumn]);
  useEffect(() => retrieveColumnValues(firstColumn), [firstColumn]);
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
        <select id="columnSelection" class="form-select">
          {columnValues?.map((column) => (
            <option value={column}>{column}</option>
          ))}
        </select>
      </div>
      <div>
        <label for="columnSelection" class="form-label">
          Select a secondary column
        </label>
        <select id="columnSelection" class="form-select">
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
});

const mapDispatchToProps = (dispatch) => ({
  retrieveColumnValues: (column) => dispatch(getColumnValues(column)),
  retrieveCountOfColumn: (column) => dispatch(getCountOfColumn(column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
