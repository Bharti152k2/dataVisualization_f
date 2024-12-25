import React, { useState } from "react";
import { Grid, Box } from "@mui/material";

import Filters from "./Filters";
import Charts from "./Charts";

function DashboardCharts() {
  const [chartData, setChartData] = useState(null);
  console.log(chartData, "chartsdata");
  return (
    <Box m={2} height="100%" sx={{ display: "flex" }}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        width="75%"
        p={2}
        height="100%"
      >
        <Charts chartData={chartData} />
      </Grid>
      <Grid
        container
        display="flex"
        flexDirection="column"
        width="25%"
        p={2}
        height="100%"
      >
        <Filters setChartData={setChartData} />
      </Grid>
    </Box>
  );
}

export default DashboardCharts;
