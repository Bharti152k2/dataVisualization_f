import React, { useContext, useState } from "react";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";
import axios from "axios";
import { loginValidationSchema } from "../helper/loginValidation.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Authentication.jsx";

function Signin() {
  //! STATES
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigateToHome = useNavigate();
  const { login } = useContext(AuthContext);

  //! Function to validate a single field
  const validateField = async (name, value) => {
    try {
      // Validate the specific field
      await loginValidationSchema.validateAt(name, {
        ...loginData,
        [name]: value,
      });
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error
    } catch (validationError) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationError.message,
      })); // Set the specific field error
    }
  };

  //! Handle input changes and validate the field
  const handleChange = async ({ target: { name, value } }) => {
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value); // Validate on change
  };

  //! Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the entire form
      await loginValidationSchema.validate(loginData, { abortEarly: false });
      setFieldErrors({}); // Clear errors if validation passes
      setErrorMsg("");
      const { data } = await axios.post(
        `https://data-visualization-b.vercel.app/api/login`,
        loginData
      );

      const tokenExpiry = new Date().getTime() + 3600 * 1000;
      login(data.token, tokenExpiry);
      setSuccessMsg(data.message);

      setTimeout(() => {
        setSuccessMsg("");
        navigateToHome("/dashboard");
      }, 2000);
    } catch (validationError) {
      // console.log(validationError);
      setSuccessMsg("");
      if (validationError.inner) {
        // Map Yup errors to the fieldErrors state
        const errors = validationError.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setFieldErrors(errors);
      } else if (validationError.response.data.message === "User not found") {
        setErrorMsg("User not found");
      } else if (
        validationError.response.data.message === "Incorrect password"
      ) {
        setErrorMsg("Incorrect password");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        background: `url('./src/assets/b1.jpg')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left Section */}
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        {/* Welcome Message */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "primary.contrastText",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Welcome to Our Platform!
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "warning.light",
            marginBottom: 3,
          }}
        >
          Dive into interactive data visualization and advanced analytics tools!
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: "primary.contrastText",
            fontStyle: "italic",
          }}
        >
          Get started today and explore the power of data!
        </Typography>
      </Grid>

      {/* Right Section */}
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Box
          component="form"
          sx={{
            width: { xs: "100%", sm: "80%", md: "60%" },
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
            boxShadow: "1px 1px 5px rgba(248, 206, 253, 0.89)",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "success.main" }}>
            Login to Your Account
          </Typography>

          {successMsg && (
            <Alert severity="success" sx={{ m: 2 }}>
              {successMsg}
            </Alert>
          )}
          {errorMsg && (
            <Alert severity="error" sx={{ m: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                onBlur={({ target: { name, value } }) =>
                  validateField(name, value)
                }
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                onBlur={({ target: { name, value } }) =>
                  validateField(name, value)
                }
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 3, backgroundColor: "success.main" }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <a href="/signup" style={{ textDecoration: "none", color: "blue" }}>
              Sign up here
            </a>
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default Signin;
