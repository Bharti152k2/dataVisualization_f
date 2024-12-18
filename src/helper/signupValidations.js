import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(
      /[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+)*/,
      "Firstname should contain only characters"
    )
    .min(3, "Firstname should contain at least 3 characters")
    .required("Firstname is mandatory"),
  lastname: Yup.string()
    .matches(
      /[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+)*/,
      "Lastname should contain only characters"
    )
    .min(4, "Lastname should contain at least 4 characters")
    .notRequired(),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is mandatory"),
  mobile: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, "Invalid mobile number")
    .required("Mobile number is mandatory"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(10, "Password must be at most 10 characters")
    .required("Password is mandatory"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Password and confirm password should match"
    )
    .required("Confirm password is mandatory"),
  gender: Yup.string().required("Select gender"),
});
