import React from "react";

import { Formik } from "formik";
import { useHistory } from "react-router-dom";

import articleApi from "apis/article";
import {
  ARTICLE_FORM_INITIAL_VALUE,
  ARTICLE_FORM_VALIDATION_SCHEMA,
} from "components/Article/constant";
import Article from "components/Article/Form/Article";
import Container from "components/Common/Container";

const Create = ({ loading, setLoading }) => {
  const history = useHistory();

  const handleSubmit = async values => {
    setLoading(true);
    const payload = { ...values, category_id: values.category.value };
    try {
      const response = await articleApi.create(payload);
      response.data?.notice && history.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container loading={loading}>
      <div className="flex justify-center h-full py-12">
        <Formik
          initialValues={ARTICLE_FORM_INITIAL_VALUE}
          validationSchema={ARTICLE_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          <Article setLoading={setLoading} />
        </Formik>
      </div>
    </Container>
  );
};

export default Create;
