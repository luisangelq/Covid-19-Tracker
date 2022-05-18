import { useState, useEffect } from "react";
import numeral from "numeral";
import { Line } from "react-chartjs-2";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState({});

  const giveColor = () => {
    if (casesType === "cases") {
      return "#f0ca3d";
    } else if (casesType === "recovered") {
      return "#7dd71d";
    } else if (casesType === "deaths") {  
      return "#ff0000";
    }
  }

  // build chart data
  const buildChartData = (data) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];

    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        );
        const data = await response.json();
        const chartData = buildChartData(data);
        setData(chartData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [casesType]);

  return (
    <div className="chartContainer">
      <h2>Worldwide new cases</h2>

      {data?.length > 0 && (
        <div className="graph">
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: giveColor(),
                  data: data,
                },
              ],
            }}
            options={options}
          />
        </div>
      )}
    </div>
  );
};

export default LineGraph;
