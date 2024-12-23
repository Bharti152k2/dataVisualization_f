import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function DashboardWelcome() {
  const token = localStorage.getItem("token");
  const userDetails = jwtDecode(token); // Decode the token to get user details
  const navigate = useNavigate();

  // Responsive styling for small screens
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 2,
      }}
    >
      {/* Welcome Card */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: "12px",
          width: "100%",
          //   textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Welcome Message */}
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome, {userDetails.name}
        </Typography>

        {/* Dashboard Introduction */}
        <Typography variant="h6" color="textSecondary" paragraph>
          You're all set to explore the analytics. Let's take a look at your
          performance data and insights.
        </Typography>
      </Paper>
    </Grid>
  );
}

export default DashboardWelcome;
