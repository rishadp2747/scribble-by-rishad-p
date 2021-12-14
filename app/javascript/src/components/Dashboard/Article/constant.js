import * as yup from "yup";

export const ARTICLE_FORM_INITIAL_VALUE = {
  title: "",
  category: "",
  body: "",
  status: "Draft",
};

export const ARTICLE_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().trim().required("Required").max(80, "Title is too long"),
  category: yup.object().required("Required").nullable(),
  body: yup.string().trim().required("Required"),
  status: yup.string().required("Required"),
});
