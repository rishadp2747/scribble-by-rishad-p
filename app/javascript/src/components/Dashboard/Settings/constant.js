import * as yup from "yup";

const GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().trim().required("Required"),
  password: yup.string().when("isPassword", {
    is: true,
    then: yup
      .string()
      .required("Required")
      .min(6, "Have at least 6 characters")
      .matches(
        /(?=.*?[0-9])(?=.*?[A-Za-z]).+$/,
        "Include at least 1 letter and 1 number"
      ),
  }),
});

export const GENERAL_SETTINGS_FORM_VALIDATION = async values => {
  const errors = {};
  try {
    await GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA.validate(values, {
      abortEarly: false,
    });
  } catch ({ inner }) {
    inner.forEach(({ path, message }) => {
      errors[path] = (errors[path] || []).concat(message);
    });
  }
  return errors;
};

export const DEFAULT_EDITING_REDIRECTION = {
  id: "",
  from_path: "",
  to_path: "",
};

export const REDIRECTION_FORM_VALIDATION_SCHEMA = yup.object().shape({
  from_path: yup
    .string()
    .trim()
    .required("Required")
    .matches(/^\/[a-zA-Z][a-zA-Z0-9-/;]+$/, "Invalid URL"),
  to_path: yup.string().trim().required("Required"),
});

export const INITIAL_ADD_CATEGORY = {
  show: false,
  vlaue: "",
  error: "",
};
export const INITIAL_EDIT_CATEGORY = {
  value: "",
  error: "",
};
