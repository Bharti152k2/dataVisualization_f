import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { DatePicker, Typography } from "antd"; // Import Ant Design DatePicker
// import "antd/dist/antd.css"; // Import Ant Design styles

const { RangePicker } = DatePicker; // Destructure RangePicker from DatePicker

function Filters({ onApplyFilters }) {
  // State for filters
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [dateRange, setDateRange] = useState([null, null]); // Start and End dates in a range

  // State for storing the chart data
  const [chartData, setChartData] = useState(null);

  // Fetch data based on filters
  const getChartsData = async () => {
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
      setChartData(response.data.data);
      onApplyFilters(response.data);
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
    >
      <Typography>Filters</Typography>
      <Grid item width="100%">
        <RangePicker
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          format="YYYY/MM/DD"
          width="100%"
        />
      </Grid>
      <Grid item width="100%">
        <Select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          label="AgeGroup"
          width="100%"
        >
          <MenuItem value="15-25">15-25</MenuItem>
          <MenuItem value=">25">greater than 25</MenuItem>
        </Select>
      </Grid>
      <Grid item width="100%">
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          label="Gender"
          width="100%"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </Grid>

      <Grid item width="100%">
        <Tooltip title="Apply filters to get the Charts">
          <Button onClick={getChartsData} variant="contained" color="primary">
            Apply
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default Filters;
