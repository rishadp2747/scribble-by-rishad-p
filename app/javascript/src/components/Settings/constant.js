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

export const GENERAL_SETTINGS_FORM_INITIAL_VALUE = {
  name: "",
  isPassword: false,
  password: "",
};

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

//Function to change design of the table which is not able to controll vai props
export const CHANGE_TABLE_DESIGN = () => {
  const table = document.getElementsByTagName("table");
  const tableHeaders = document.querySelectorAll(".ant-table-thead tr th");

  tableHeaders.forEach(tableHeader =>
    tableHeader.classList.add("bg-indigo-50")
  );
  table[1].classList.add("redirection-table");
};
