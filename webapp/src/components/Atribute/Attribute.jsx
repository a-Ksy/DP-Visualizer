import "./Attribute.css";
import { connect } from "react-redux";
import { getCountOfColumn } from "../../store/data";

const Attribute = (props) => {
  const { text, retrieveCountOfColumn } = props;
  return (
    <div className="Attribute" onClick={() => retrieveCountOfColumn(text)}>
      {text}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  retrieveCountOfColumn: (column) => dispatch(getCountOfColumn(column)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
