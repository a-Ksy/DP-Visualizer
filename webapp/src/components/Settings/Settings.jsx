import { useEffect } from "react";
import Attribute from "../Atribute/Attribute";
import { connect } from "react-redux";
import { getColumns, getCountOfColumn } from "../../store/data";
import "./Settings.css";
import Button from "../Button/Button";
import { useState } from "react";

const Settings = (props) => {
  const { retrieveColumns, retrieveCountOfColumn, columns, type } = props;
  useEffect(() => retrieveColumns(), []);
  const [selectedColumn, setSelectedColumn] = useState(null);

  if (type === "landing") {
    return (
      <div className="InitialSettings">
        <p>Select a column to begin:</p>
        <div className="row">
          {columns?.map((column) => (
            <Attribute text={column} setSelectedColumn={setSelectedColumn} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="Settings">
      <div className="d-flex justify-content-start">
        <div className="form">
          <label for="columnSelection" class="form-label">
            Select a column
          </label>
          <select
            id="columnSelection"
            class="form-select"
            onChange={(e) => setSelectedColumn(e.target.value)}
            value={selectedColumn}
          >
            {columns?.map((column) => (
              <option value={column}>{column} </option>
            ))}
          </select>
        </div>
        <Button onClick={() => retrieveCountOfColumn(selectedColumn)}>
          Submit
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  columns: state.data.columns,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveColumns: () => dispatch(getColumns()),
  retrieveCountOfColumn: (column) => dispatch(getCountOfColumn(column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
