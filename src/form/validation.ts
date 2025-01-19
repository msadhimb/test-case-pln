import * as yup from "yup";

export const addUserValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  password: yup.string().required("Password is required"),
});

export const updateUserValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  password: yup.string(),
});

export const projectValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
});
