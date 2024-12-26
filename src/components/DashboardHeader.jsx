import { Typography, Grid, Button, Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useNavigate } from "react-router-dom";

function DashboardHeader() {
  const token = localStorage.getItem("token");
  const userDetails = jwtDecode(token); // Decode the token
  const navigate = useNavigate();
  const [profileClicked, setProfileClicked] = useState(false);

  // Media query for responsive behavior
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={isSmallScreen ? 1 : 2}
      sx={{
        flexWrap: "wrap",
        boxShadow: "1px 1px 10px gray",
        backgroundColor: "info.main",
      }}
    >
      <Typography
        variant={isSmallScreen ? "h6" : "h4"}
        sx={{ color: "purple", marginLeft: isSmallScreen ? "2.2rem" : "0" }}
      >
        Dashboard
      </Typography>

      {/* Profile Button */}
      <button
        onClick={() => setProfileClicked(!profileClicked)}
        // onBlur={() => setProfileClicked(false)}
        style={{
          border: "1px solid purple",
          borderRadius: "100%",
          width: isSmallScreen ? "30px" : "40px",
          height: isSmallScreen ? "30px" : "40px ",
          fontSize: isSmallScreen ? "14px" : "16px",
          fontWeight: "bold",
          backgroundColor: "rgb(255, 200, 251)",
          color: "rgb(72, 40, 214)",
          cursor: "pointer",
        }}
      >
        {userDetails.name.charAt(0).toUpperCase()}
      </button>

      {/* Profile Popup */}
      {profileClicked && (
        <Box
          sx={{
            position: "absolute",
            top: isSmallScreen ? "50px" : "70px",
            right: "20px",
            width: isSmallScreen ? "160px" : "200px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.16)",
            zIndex: 1000,
            padding: isSmallScreen ? "10px" : "16px",
          }}
        >
          <Grid container direction="column" alignItems="center">
            {/* Profile Heading */}
            <Typography
              variant="h6"
              gutterBottom
              fontSize={isSmallScreen ? "14px" : "16px"}
            >
              Profile
            </Typography>

            {/* Profile Image */}
            <Box
              sx={{
                width: isSmallScreen ? "40px" : "50px",
                height: isSmallScreen ? "40px" : "50px",
                borderRadius: "50%",
                backgroundColor: "green",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isSmallScreen ? "22px" : "28px",
                fontWeight: "bold",
                marginBottom: isSmallScreen ? "12px" : "16px",
              }}
            >
              {userDetails.name.charAt(0).toUpperCase()}
            </Box>

            {/* User Details */}
            <Typography
              variant="body1"
              fontWeight="bold"
              fontSize={isSmallScreen ? "14px" : "16px"}
            >
              {userDetails.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              fontSize={isSmallScreen ? "12px" : "14px"}
              gutterBottom
            >
              {userDetails.email}
            </Typography>

            {/* Logout Button */}
            <Button
              // variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{
                marginTop: isSmallScreen ? "10px" : "16px",
                fontSize: isSmallScreen ? "10px" : "14px",
                fontWeight: "bold",
              }}
            >
              Logout
            </Button>
          </Grid>
        </Box>
      )}
    </Grid>
  );
}

export default DashboardHeader;
