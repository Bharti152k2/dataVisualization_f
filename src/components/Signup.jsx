import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { inputData } from "../helper/signupFields.js"; // Adjust as per your file
import { signupValidationSchema } from "../helper/signupValidations.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  //! STATES
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //! HOOK TO NAVIGATE
  const navigateToLogin = useNavigate();

  //! Validate a Single Field
  const validateField = async (name, value) => {
    try {
      await signupValidationSchema.validateAt(name, {
        ...signupData,
        [name]: value,
      });
      setFormErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error
    } catch (validationError) {
      setFormErrors((prev) => ({ ...prev, [name]: validationError.message }));
    }
  };

  //! FUNCTION TO HANDLE INPUT CHANGES
  const handleChange = ({ target: { name, value } }) => {
    setSignupData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // Validate the specific field
  };

  //! FUNCTION TO SUBMIT DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the entire form
      await signupValidationSchema.validate(signupData, { abortEarly: false });
      setFormErrors({}); // Clear errors if validation passes
      setErrorMsg("");
      const { data } = await axios.post(
        `http://localhost:3000/api/signup`,
        signupData
      );
      setSuccessMsg(data.message);

      setTimeout(() => {
        setSuccessMsg("");
        navigateToLogin("/login");
      }, 2000);
    } catch (validationError) {
      setSuccessMsg("");
      if (validationError.inner) {
        // Map Yup errors to the formErrors state
        const errors = validationError.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setFormErrors(errors);
      } else if (
        validationError.response.data.message === "User already exists"
      ) {
        setErrorMsg("User already exists");
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
        background: `url('./src/assets/k2.webp'),linear-gradient(135deg, #e3f2fd, #f5f5f5)`,
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
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
            color: "primary.main",
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
            color: "text.secondary",
            marginBottom: 3,
          }}
        >
          Dive into interactive data visualization and advanced analytics tools!
        </Typography>

        {/* Optional Call-to-Action */}
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: "text.primary",
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
        }}
      >
        <Box
          component="form"
          sx={{
            width: { xs: "100%", sm: "80%", md: "60%" },
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "rgb(26, 116, 241)" }}
          >
            Create a New Account
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
            {inputData.map(({ id, type, placeholder, name }) => (
              <Grid item xs={12} sm={6} key={id}>
                <TextField
                  fullWidth
                  type={type}
                  label={placeholder}
                  name={name}
                  value={signupData[name]}
                  onChange={handleChange}
                  onBlur={({ target: { name, value } }) =>
                    validateField(name, value)
                  }
                  error={!!formErrors[name]}
                  helperText={formErrors[name]}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <FormControl component="fieldset" error={!!formErrors.gender}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={signupData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                {formErrors.gender && (
                  <Typography color="error" variant="caption">
                    {formErrors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 3 }}
          >
            Register
          </Button>

          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            Already have an account? <a href="/login">Login here</a>
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default Signup;
