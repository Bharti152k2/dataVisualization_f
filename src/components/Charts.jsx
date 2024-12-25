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
import { Grade } from "@mui/icons-material";

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
    <div style={{ height: "100%" }}>
      {/* Render bar chart */}
      {barData ? (
        <div>
          <h2 style={{ color: "purple" }}>Bar Chart</h2>
          <Bar data={barData} options={barOptions} />
          <p style={{fontSize:"20px"}}>
            <span style={{ fontWeight: "bold" }}>Note:</span>Select a feature
            from the bar chart to view the time trend
          </p>
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          <h2 style={{ color: "purple" }}>Bar Chart</h2>
          <div
            style={{
              height: "96%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "25px",
              boxShadow: "1px 1px 20px rgba(0,0,0,0.2)",
              borderRadius: "10px",
            }}
          >
            No data available for the bar chart <br /> Select filters to view
            the charts
          </div>
        </div>
      )}

      {/* Render line chart */}
      {lineChartData && (
        <div style={{marginTop:"5%"}}>
          <h2 style={{color:"purple"}}>Line Chart</h2>
          <Line data={lineChartData} options={lineOptions} />
        </div>
      )}
    </div>
  );
}

export default Charts;
