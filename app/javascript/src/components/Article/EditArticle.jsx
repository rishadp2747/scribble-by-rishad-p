import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import { useParams, useHistory } from "react-router-dom";

import articleApi from "apis/article";
import { ARTICLE_FORM_VALIDATION_SCHEMA } from "components/Article/constant";
import Article from "components/Article/Form/Article";

const EditArticle = ({ setLoading }) => {
  const [article, setArticle] = useState({});
  const { articleId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchArticle();
  }, []);

  const ARTICLE_FORM_INITIAL_VALUE = {
    ...article,
    ...{
      category: {
        label: article?.category?.title,
        value: article?.category?.id,
      },
    },
  };

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await articleApi.show(articleId);
      response.data?.article && setArticle(response.data?.article);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    setLoading(true);
    const payload = { ...values, category_id: values.category.value };
    try {
      const response = await articleApi.update(articleId, payload);
      response.data?.notice && history.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-full py-12">
      <Formik
        enableReinitialize
        initialValues={ARTICLE_FORM_INITIAL_VALUE}
        validationSchema={ARTICLE_FORM_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        <Article setLoading={setLoading} />
      </Formik>
    </div>
  );
};

export default EditArticle;
