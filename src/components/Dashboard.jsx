import { Grid } from "@mui/material";
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWelcome from "./DashboardWelcome";
// import Filters from "./Filters";
import LeftSideDrawer from "./LeftSideDrawer";
import DashboardCharts from "./DashboardCharts";

function Dashboard() {
  // Dashboard page with left side drawer and right side of page contains header, welcome card, and charts with filters
  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      style={{ width: "100%" }}
    >
      <Grid
        item
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "17%",
          height: "100vh",
          backgroundColor: "#f4f4f4",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LeftSideDrawer />
      </Grid>
      <Grid
        item
        display="flex"
        flexDirection="column"
        style={{
          marginLeft: "17%",
          width: "83%",
        }}
      >
        <Grid item>
          <DashboardHeader />
        </Grid>
        <Grid item>
          <DashboardWelcome />
          <DashboardCharts />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
