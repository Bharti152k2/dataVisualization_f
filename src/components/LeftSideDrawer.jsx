import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { purple } from "@mui/material/colors";
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
        background: "linear-gradient(to top,rgb(17, 0, 255),rgb(200, 0, 255))",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          padding: "30px 5px 0px 5px ",
          letterSpacing: "2px",
          color: "white",
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
                location.pathname === item.path ? "primary.main" : "inherit", // Highlight active item
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "16px",

                fontWeight: "medium",
                color: location.pathname === item.path && "#fff",
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
          color: "warning.main", // Light gray text for footer
        }}
      >
        © 2024 DataVision
      </Typography>
    </Box>
  );
}

export default LeftSideDrawer;
