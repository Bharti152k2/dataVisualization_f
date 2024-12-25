import React, { useEffect, useState } from "react";
import { Button, Select, MenuItem, Grid, Tooltip } from "@mui/material";
import axios from "axios";
import { DatePicker, Typography } from "antd";
const { RangePicker } = DatePicker;

function Filters({ setChartData }) {
  // State for filters
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [dateRange, setDateRange] = useState([null, null]); // Start and End dates in a range
  const [error, setError] = useState("");
  // State for storing the chart data
  // const [chartData, setChartData] = useState(null);
  // Fetch data based on filters
  const getChartsData = async () => {
    if (!dateRange[0] || !dateRange[1]) {
      setError("Please select a valid date range.");
      return;
    } else {
      setError("");
    }
    try {
      const [startDate, endDate] = dateRange;

      // Format the dates as "DD/MM/YYYY" before sending them to the backend
      const formattedStartDate = startDate
        ? startDate.format("DD/MM/YYYY")
        : null;
      const formattedEndDate = endDate ? endDate.format("DD/MM/YYYY") : null;

      const response = await axios.get(`http://localhost:4000/api/data`, {
        params: {
          ageGroup,
          gender,
          startDate: formattedStartDate, // Convert to ISO string
          endDate: formattedEndDate, // Convert to ISO string
        },
      });
      console.log("Fetched data:", response.data.data);
      if (!response.data.data || response.data.data.length === 0) {
        setError("No data found for the selected filters.");
        setChartData(null); // Clear chart data
      } else {
        setError("");
        setChartData(response.data.data); // Set chart data
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      width="100%"
      p={2}
      height="100%"
      gap="5%"
    >
      <h3>Filters</h3>

      <Grid item width="100%">
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          format="YYYY/MM/DD"
          style={{ width: "100%", height: "170%" }}
        />
      </Grid>
      {error && (
        <p style={{ color: "red", margin: "10px 0px -26px 0px" }}>{error}</p>
      )}
      <Grid item width="100%">
        <Select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          displayEmpty
          style={{ width: "100%", marginTop: "26px" }}
        >
          <MenuItem value="" disabled>
            Select AgeGroup
          </MenuItem>
          <MenuItem value="15-25">15-25</MenuItem>
          <MenuItem value=">25">greater than 25</MenuItem>
        </Select>
      </Grid>
      <Grid item width="100%">
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ width: "100%" }}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Gender
          </MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </Grid>

      <Grid item width="100%">
        <Tooltip title="Apply filters to get the Charts">
          <Button
            onClick={getChartsData}
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "warning.main" }}
          >
            Apply
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Filters;
