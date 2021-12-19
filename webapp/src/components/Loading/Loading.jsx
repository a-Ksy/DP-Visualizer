import React from "react";
import { connect } from "react-redux";
import GridLoader from "react-spinners/GridLoader";
import "./Loading.css";

const Loading = (props) => {
  const { loadingData } = props;
  let content = null;
  if (loadingData) {
    content = (
      <div className="fullDim">
        <GridLoader size={15} color="#243141" />
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  loadingData: state.data.loading,
});

export default connect(mapStateToProps)(Loading);
