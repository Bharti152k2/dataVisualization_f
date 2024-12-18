import * as yup from "yup";

// Define the validation schema
export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is mandatory")
    .test(
      "is-valid-username",
      "Username must be a valid email or mobile number",
      (value) => {
        const mobRegex = /^[6-9][0-9]{9}$/;
        const emailRegex = /^[a-z0-9]+@[a-z]+.[a-z]+$/;
        return mobRegex.test(value) || emailRegex.test(value);
      }
    ),
  password: yup
    .string()
    .required("Password should not be empty")
});
