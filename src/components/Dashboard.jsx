import {
  Drawer,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWelcome from "./DashboardWelcome";
import MenuIcon from "@mui/icons-material/Menu";
import LeftSideDrawer from "./LeftSideDrawer";
import DashboardCharts from "./DashboardCharts";

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      style={{ width: "100%" }}
    >
      {isMobile ? (
        <>
          {/* Menu Icon */}
          <IconButton
            style={{ position: "absolute", top: 5, left: 5 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          {/* Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <LeftSideDrawer />
          </Drawer>
        </>
      ) : (
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
      )}
      <Grid
        item
        display="flex"
        flexDirection="column"
        xs={12}
        sm={10}
        md={10}
        style={{
          marginLeft: isMobile ? 0 : "17%",
          width: isMobile ? "100%" : "83%",
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
