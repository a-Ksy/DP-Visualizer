import "./Attribute.css";
import { connect } from "react-redux";
import { getCountOfColumn } from "../../store/data";

const Attribute = (props) => {
  const { text, setSelectedColumn, retrieveCountOfColumn } = props;

  const retrieveCount = () => {
    retrieveCountOfColumn(text);
    console.log("setselectedcolumn to", text);
    setSelectedColumn(text);
  };

  return (
    <div className="Attribute" onClick={() => retrieveCount()}>
      {text}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  retrieveCountOfColumn: (column) => dispatch(getCountOfColumn(column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
