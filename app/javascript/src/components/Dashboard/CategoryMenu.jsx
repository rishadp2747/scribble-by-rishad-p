import React, { useEffect, useState } from "react";

import { Plus, Search, Close, Check } from "neetoicon";
import { Typography, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoryApi from "apis/category";
import { DEFAULT_CATEGORY_ACTIONS } from "components/Dashboard/constant";

const CategoryMenu = ({ setLoading }) => {
  const [categories, setCategories] = useState([]);
  const [categoryActions, setCategoryActions] = useState(
    DEFAULT_CATEGORY_ACTIONS
  );

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

  const handleAddCategory = async () => {
    setLoading(true);
    try {
      const payload = { category: { title: categoryActions.add.value } };
      const response = await categoryApi.create(payload);
      response.data?.notice && fetchCategories();
    } finally {
      setLoading(false);
    }
    // console.log(categoryActions);
  };

  const handleAddCategoryChange = e => {
    setCategoryActions(categoryActions => ({
      ...categoryActions,
      add: { show: true, value: e.target.value },
    }));
  };

  const handleAddCategoryIcon = () => {
    setCategoryActions(categoryActions => ({
      ...categoryActions,
      add: { show: true, value: "" },
    }));
  };

  const handleSearchCategoryIcon = () => {
    setCategoryActions(categoryActions => ({
      ...categoryActions,
      search: { show: true },
    }));
  };

  const ACTIONS = {
    search: <Search size={18} onClick={handleSearchCategoryIcon} />,
    add: <Plus size={18} onClick={handleAddCategoryIcon} />,
    searchClose: (
      <Close size={18} onClick={() => handleActionClose("search")} />
    ),
    addClose: <Close size={18} onClick={() => handleActionClose("add")} />,
  };

  const CATEGORY_ACTION_ICONS = [
    {
      icon: () =>
        categoryActions.search.show ? ACTIONS.searchClose : ACTIONS.search,
    },
    {
      icon: () => (categoryActions.add.show ? ACTIONS.addClose : ACTIONS.add),
    },
  ];

  const handleActionClose = action => {
    if (action === "search") {
      setCategoryActions(categoryActions => ({
        ...categoryActions,
        search: false,
      }));
    } else if (action === "add") {
      setCategoryActions(categoryActions => ({
        ...categoryActions,
        add: false,
      }));
    }
  };

  return (
    <>
      <MenuBar.SubTitle iconProps={CATEGORY_ACTION_ICONS}>
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      {categoryActions.search.show && (
        <Input id="search" suffix={<Search />} className="my-2" />
      )}

      {categoryActions.add.show && (
        <Input
          id="add"
          className="my-2"
          onChange={handleAddCategoryChange}
          suffix={
            <Check className="cursor-pointer" onClick={handleAddCategory} />
          }
        />
      )}
      {categories.map(({ title }, index) => (
        <MenuBar.Block key={index} label={title} count={80} />
      ))}
    </>
  );
};

export default CategoryMenu;
