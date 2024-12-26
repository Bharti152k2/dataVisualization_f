import React, { useState } from "react";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";

import Filters from "./Filters";
// import Charts from "./Charts";
const Charts = React.lazy(() => import("./charts"));

function DashboardCharts() {
  const [chartData, setChartData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(chartData, "chartsdata");
  return (
    <Box m={2} height="100%" sx={{ display: "flex" }}>
      {isMobile ? (
        <Grid container display="flex">
          <Grid
            item
            display="flex"
            flexDirection="column"
            // width="25%"
            p={2}
            height="50%"
          >
            <Filters setChartData={setChartData} />
          </Grid>
          <Grid
            item
            display="flex"
            flexDirection="column"
            // width="75%"
            p={2}
            height="100%"
          >
            <Charts chartData={chartData} />
          </Grid>
        </Grid>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}

export default DashboardCharts;
