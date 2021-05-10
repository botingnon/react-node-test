import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { Chart as GChart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";

import { fetchChart, selectAllChart } from "../../store/reducers/Chart";

const Chart = props => {
  const { farm_id } = props;
  const dispatch = useDispatch();
  const data = useSelector(selectAllChart);
  const status = useSelector(state => state.chart.status);
  const error = useSelector(state => state.chart.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchChart(farm_id));
    }
  }, [data, status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (status === "succeeded") {
    if (data.length > 1) {
      content = (
        <GChart
          height={250}
          chartType="ComboChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            seriesType: "bars",
            series: {
              0: { type: "line", visibleInLegend: false, targetAxisIndex: 0 },
              1: { visibleInLegend: false, targetAxisIndex: 1 }
            },
            vAxes: {
              0: {
                title: "NDVI"
              },
              1: {
                title: "PRECIPITATION"
              }
            }
          }}
        />
      );
    } else {
      content = "";
    }
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return <>{content}</>;
};

Chart.propTypes = {
  farm_id: PropTypes.string
};

export default Chart;
