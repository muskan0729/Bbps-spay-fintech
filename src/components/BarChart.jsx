import React from "react";
import Chart from "react-apexcharts";

function BarChart({ chartId, chartCategories, chartName, dataArray, chartType = "bar" }) {
  const options = {
    chart: { id: chartId || "defaultChart" },
    xaxis: { categories: chartCategories || [] },
    colors:["#05f384ff"]
  };

  const series = [
    { name: chartName || "Series 1", data: dataArray || [] },
  ];

  return (
    <div className="app">
      <Chart options={options} series={series} type={chartType} height={350} />
    </div>
  );
}

export default BarChart;
