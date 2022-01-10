import Settings from "../Settings/Settings";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import { getDatabases, getColumns } from "../../store/data";
import Attribute from "../Atribute/Attribute";
import { useState, useEffect } from "react";

const Dashboard = (props) => {
  const { databases, retrieveDatabases, histogram, columns } = props;

  useEffect(() => retrieveDatabases(), []);

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
          {columns === undefined ? (
            <div className="row">
              <div className="InitialSettings">
                <p>Select a database to begin:</p>
                <div className="row">
                  {databases?.map((column) => (
                    <Attribute text={column} type="db" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="InitialSettings">
                <p>Select a column:</p>
                <div className="row">
                  {columns?.map((column) => (
                    <Attribute
                      text={column}
                      setFirstColumn={setFirstColumn}
                      type="column"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
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
          {data.length !== 0 ? (
            <Chart
              width={"80vw"}
              height={"60vh"}
              chartType="ColumnChart"
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
          ) : (
            <p>No data available for the query</p>
          )}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  histogram: state.data.histogram,
  columns: state.data.columns,
  databases: state.data.databases,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveDatabases: () => dispatch(getDatabases()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
