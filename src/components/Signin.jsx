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
        `http://localhost:3000/api/login`,
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
      console.log(validationError);
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

  //! JSX
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Left Section */}
      <Grid
        container
        // xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", color: "primary.main" }}
        >
          Welcome Back! Please Log In.
        </Typography>
      </Grid>

      {/* Right Section */}
      <Grid
        container
        // xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          border: "2px solid purple",
        }}
      >
        <Box
          component="form"
          sx={{
            width: { xs: "100%", sm: "80%", md: "70%" },
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
            border: "2px solid green",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" gutterBottom>
            Login to Your Account
          </Typography>

          {successMsg && <Alert severity="success">{successMsg}</Alert>}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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
                } // Validate on blur
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
                } // Validate on blur
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 3 }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Don't have an account? <a href="/signup">Sign up here</a>
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default Signin;
