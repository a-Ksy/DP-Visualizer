import "./Attribute.css";
import { connect } from "react-redux";
import { getColumns, getCountOfColumn, setDatabase } from "../../store/data";

const Attribute = (props) => {
  const {
    text,
    type,
    setFirstColumn,
    retrieveColumns,
    retrieveCountOfColumn,
    selectDatabase,
    dbName,
  } = props;

  const retrieveData = () => {
    if (type === "column") {
      setFirstColumn(text);
      retrieveCountOfColumn(dbName, text);
    } else {
      retrieveColumns(text);
      selectDatabase(text);
    }
  };

  return (
    <div className={`Attribute ${type}`} onClick={() => retrieveData()}>
      {text}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dbName: state.data.database,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveCountOfColumn: (dbName, column) =>
    dispatch(getCountOfColumn(dbName, column)),
  retrieveColumns: (dbName) => dispatch(getColumns(dbName)),
  selectDatabase: (dbName) => dispatch(setDatabase(dbName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
