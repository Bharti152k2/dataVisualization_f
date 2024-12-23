import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LeftSideDrawer() {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Reports" },
    { label: "Analytics" },
    { label: "Users" },
    { label: "Settings" },
    { label: "Help" },
  ];

  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate to different pages

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "rgb(211, 231, 244)", // Dark blue background
        color: "#ECF0F1", // Light text color
        padding: "16px",
        // boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)", // Shadow for drawer
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo Section */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          padding: "40px 5px 0px 5px ",
          color: "orange",
        }}
      >
        DataVision
      </Typography>

      {/* Navigation List */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => navigate(item.path)} // Navigate on click
            sx={{
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor:
                location.pathname === item.path
                  ? "rgb(253, 196, 144)"
                  : "inherit", // Highlight active item
              "&:hover": {
                backgroundColor: "rgb(253, 196, 144)", // Slightly darker on hover
              },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "16px",

                fontWeight: "medium",
                color: location.pathname === item.path ? "#fff" : "#000",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Footer Section */}
      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          fontSize: "12px",
          color: "#BD73C9", // Light gray text for footer
        }}
      >
        © 2024 DataVision
      </Typography>
    </Box>
  );
}

export default LeftSideDrawer;
