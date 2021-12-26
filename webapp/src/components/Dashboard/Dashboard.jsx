import Settings from "../Settings/Settings";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import { getColumns } from "../../store/data";
import Attribute from "../Atribute/Attribute";
import { useState, useEffect } from "react";

const Dashboard = (props) => {
  const { retrieveColumns, histogram, columns } = props;

  useEffect(() => retrieveColumns(), []);

  const [firstColumn, setFirstColumn] = useState(null);
  const [firstColumnVal, setFirstColumnVal] = useState(null);
  const [secondColumn, setSecondColumn] = useState(null);

  if (histogram === undefined || histogram === null) {
    return (
      <div className="Dashboard">
        <div className="DashboardElements">
          <div className="row">
            <p className="LandingMessage">
              Visualize your data as{" "}
              <span className="emphasized">differentially private</span>
            </p>
          </div>
          <div className="row">
            <div className="InitialSettings">
              <p>Select a column to begin:</p>
              <div className="row">
                {columns?.map((column) => (
                  <Attribute text={column} setFirstColumn={setFirstColumn} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const { data, options } = histogram;

    return (
      <div className="Dashboard">
        <div className="row">
          <Settings
            type="dashboard"
            setFirstColumn={setFirstColumn}
            firstColumn={firstColumn}
            firstColumnVal={firstColumnVal}
            setFirstColumnVal={setFirstColumnVal}
            secondColumn={secondColumn}
            setSecondColumn={setSecondColumn}
          />
          <Chart
            width={"80vw"}
            height={"60vh"}
            chartType="Histogram"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              hAxis: {
                title: "Total Count",
                ticks: options["x_ticks"],
              },
              vAxis: {
                title: data[0][0],
              },
            }}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  histogram: state.data.histogram,
  columns: state.data.columns,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveColumns: () => dispatch(getColumns()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
