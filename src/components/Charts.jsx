import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  zoomPlugin
);

function Charts({ chartData }) {
  const [lineChartData, setLineChartData] = useState(null);

  // Prepare bar chart data
  const barData = chartData
    ? {
        labels: Object.keys(chartData[0]).filter(
          (key) => key !== "Age" && key !== "Gender" && key !== "Day"
        ),
        datasets: [
          {
            label: "Total Time Spent",
            data: Object.keys(chartData[0])
              .filter(
                (key) => key !== "Age" && key !== "Gender" && key !== "Day"
              )
              .map((key) => chartData.reduce((sum, obj) => sum + obj[key], 0)), // Aggregate data
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      }
    : null;

  // Bar chart options
  const barOptions = {
    indexAxis: "y", // Makes the bar chart horizontal
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const featureName = Object.keys(chartData[0]).filter(
          (key) => key !== "Age" && key !== "Gender" && key !== "Day"
        )[index];
        loadLineChart(featureName);
      }
    },
    scales: {
      x: { title: { display: true, text: "Total Time Spent" } },
      y: { title: { display: true, text: "Features" } },
    },
  };

  // Load line chart data
  const loadLineChart = (selectedFeature) => {
    const timeTrendData = chartData.map((item) => ({
      timestamp: item.Day,
      value: item[selectedFeature],
    }));

    setLineChartData({
      labels: timeTrendData.map((entry) => entry.timestamp),
      datasets: [
        {
          label: `Time Trend for ${selectedFeature}`,
          data: timeTrendData.map((entry) => entry.value),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.3,
        },
      ],
    });
  };

  // Line chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
      zoom: {
        pan: { enabled: true, mode: "x" },
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
      },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Value" } },
    },
  };

  return (
    <div>
      {/* Render bar chart */}
      {barData ? (
        <div>
          <h3>Bar Chart</h3>
          <Bar data={barData} options={barOptions} />
          <p>Select a feature from the bar chart to view the time trend</p>
        </div>
      ) : (
        <div>
          <h3>Bar Chart</h3>
          <div>No data available for the bar chart</div>
        </div>
      )}

      {/* Render line chart */}
      {lineChartData && (
        <div>
          <h3>Line Chart</h3>
          <Line data={lineChartData} options={lineOptions} />
        </div>
      )}
    </div>
  );
}

export default Charts;
