import Settings from "../Settings/Settings";
import "./Dashboard.css";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";

const Dashboard = (props) => {
  const { counts } = props;

  if (counts === undefined || counts === null) {
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
    return (
      <div className="Dashboard">
        <div className="row">
          <Settings type="dashboard" />
          <Chart
            width={"80vw"}
            height={"60vh"}
            chartType="Histogram"
            loader={<div>Loading Chart</div>}
            data={counts}
            options={{
              hAxis: {
                title: "Total Count",
              },
              vAxis: {
                title: counts[0][0],
              },
            }}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  counts: state.data.counts,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
