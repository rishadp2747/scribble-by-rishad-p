import * as yup from "yup";

export const ARTICLE_FORM_INITIAL_VALUE = {
  title: "",
  category: "",
  body: "",
  status: "draft",
};

export const ARTICLE_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().trim().required("Required"),
  category: yup.object().required("Required").nullable(),
  body: yup.string().trim().required("Required"),
  status: yup.string().required("Required"),
});
