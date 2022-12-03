import { useState } from "react";

// charting library
import Chart from "react-apexcharts";

// mui Toggle
import { ToggleButton } from "@mui/material/";
import { ToggleButtonGroup } from "@mui/material/";

export const StockChart = ({ chartData, symbol }) => {
  const [chartInterval, setChartInterval] = useState("day");
  const { day, week } = chartData;

  const chartColor =
    chartData[chartInterval][0].y <
    chartData[chartInterval][chartData[chartInterval].length - 1].y
      ? "#26C281"
      : "#ed3419";

  const options = {
    colors: [chartColor],
    chart: {
      id: "stock data",
      animation: {
        speed: 1300,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
    title: {
      text: undefined,
    },
  };

  const changeInterval = (e) => {
    setChartInterval(e.target.value);
  };

  const series = [{ name: symbol, data: chartInterval === "day" ? day : week }];
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={chartInterval}
        onChange={changeInterval}
        size="small"
      >
        <ToggleButton value="day">24H</ToggleButton>
        <ToggleButton value="week">7D</ToggleButton>
      </ToggleButtonGroup>

      {/* Stock chart */}
      <Chart options={options} series={series} type="area" />
    </>
  );
};
