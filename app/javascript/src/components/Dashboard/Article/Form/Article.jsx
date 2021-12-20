import React, { useState, useEffect } from "react";

import { Form, useFormikContext } from "formik";
import { Button, Dropdown } from "neetoui";
import { Input, Select, Textarea } from "neetoui/formik";

import categoryApi from "apis/category";

const Article = ({ setLoading }) => {
  const { values, setFieldValue } = useFormikContext();
  const [categories, setCategories] = useState([]);

  const CATEGORY_OPTIONS = categories?.map(({ id, title }) => ({
    label: title,
    value: id,
  }));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.list();
      setCategories(response.data?.categories);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = e => {
    setFieldValue("status", e.target.id);
  };

  return (
    <Form className="w-2/3 space-y-6">
      <div className="flex flex-row space-x-6">
        <Input
          required
          type="text"
          label="Article Title"
          name="title"
          placeholder="Write article title here"
        />
        <Select
          required
          isClearable={false}
          isSearchable={false}
          size="small"
          label="Category"
          name="category"
          options={CATEGORY_OPTIONS}
          placeholder="Select a category"
        />
      </div>
      <Textarea
        required
        rows={50}
        name="body"
        label="Article Body"
        placeholder="Write article content here"
      />
      <div className="flex flex-row space-x-2">
        <div className="flex flex-row">
          <Button
            type="submit"
            style="primary"
            className="capitalize"
            label={`Save ${values.status}`}
          />
          <Dropdown buttonStyle="primary" position="bottom-end" name="status">
            <li id="draft" onClick={handleStatusChange}>
              Draft
            </li>
            <li id="published" onClick={handleStatusChange}>
              Published
            </li>
          </Dropdown>
        </div>

        <Button type="reset" style="text" label="Cancel" />
      </div>
    </Form>
  );
};

export default Article;
