import Settings from "../Settings/Settings";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

const Dashboard = (props) => {
  const { histogram } = props;

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
            <Settings type="landing" />
          </div>
        </div>
      </div>
    );
  } else {
    const { data, options } = histogram;

    return (
      <div className="Dashboard">
        <div className="row">
          <Settings type="dashboard" />
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
