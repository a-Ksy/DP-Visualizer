import "./Attribute.css";
import { connect } from "react-redux";
import { getCountOfColumn } from "../../store/data";

const Attribute = (props) => {
  const { text, setFirstColumn, retrieveCountOfColumn } = props;

  const retrieveCount = () => {
    setFirstColumn(text);
    retrieveCountOfColumn(text);
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
