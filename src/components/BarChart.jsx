import React from "react";
import Chart from "react-apexcharts";

function BarChart({
  chartId,
  chartCategories,
  chartName,
  dataArray,
  chartType = "bar",
}) {
  const options = {
    chart: {
      id: chartId || "defaultChart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: chartCategories || [],
      labels: {
        show: false, // Hide text
      },
      axisBorder: {
        show: false, // Remove bottom border line
      },
      axisTicks: {
        show: false, // Remove small ticks
      },
      tooltip: {
        enabled: false, // Hide tooltip for x-axis
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#555", fontSize: "13px" },
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
      xaxis: {
        lines: { show: false }, // Remove grid lines along x-axis
      },
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        columnWidth: "45%",
        distributed: true,
      },
    },
    colors: ["#02d3f8ea"],
    tooltip: {
      enabled: true, // still show tooltip when hovering bars
      theme: "light",
      style: { fontSize: "13px" },
    },
  };

  const series = [{ name: chartName || "Series 1", data: dataArray || [] }];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {chartName || "Bar Chart"}
        </h3>
        <span className="text-sm text-gray-500">{chartType.toUpperCase()}</span>
      </div>

      {/* Chart */}
      <div className="w-full h-[350px]">
        <Chart
          options={options}
          series={series}
          type={chartType}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}

export default BarChart;
