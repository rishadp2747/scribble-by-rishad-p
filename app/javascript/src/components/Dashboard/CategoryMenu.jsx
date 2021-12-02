import React, { useEffect, useState } from "react";

import { Plus, Search, Close, Check } from "neetoicon";
import { Typography, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import categoryApi from "apis/category";
import { DEFAULT_CATEGORY_ACTIONS } from "components/Dashboard/constant";
import useDebounce from "hooks/useDebounce";

const CategoryMenu = ({ setLoading }) => {
  const [categories, setCategories] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [categoryActions, setCategoryActions] = useState(
    DEFAULT_CATEGORY_ACTIONS
  );

  const SEARCH_KEYWORD = useDebounce(categoryActions.search.value, 1000);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (SEARCH_KEYWORD && SEARCH_KEYWORD !== "") {
      const keyword = SEARCH_KEYWORD.toLowerCase();
      const result = categories.filter(({ title }) =>
        title.toLowerCase().split(" ").includes(keyword)
      );
      setCategories(result);
    } else {
      setCategories(searchCategories);
    }
  }, [SEARCH_KEYWORD]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.list();
      setCategories(response.data?.categories);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryActionValueChange = e => {
    const action = e.target.id;
    const newCategoryActionValue = categoryActions;
    newCategoryActionValue[action].value = e.target.value;
    setCategoryActions({ ...newCategoryActionValue });
  };

  const handleAddCategory = async () => {
    setLoading(true);
    try {
      const payload = { category: { title: categoryActions.add.value } };
      const response = await categoryApi.create(payload);
      if (response.data?.category) {
        setCategories(categories => [...categories, response.data?.category]);
        setCategoryActions(categoryActions => ({
          ...categoryActions,
          add: { show: true, value: "" },
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategoryIcon = () => {
    setCategoryActions(categoryActions => ({
      ...categoryActions,
      add: { show: true, value: "" },
    }));
  };

  const handleSearchCategoryIcon = () => {
    setSearchCategories(categories);
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
        search: {
          show: false,
          value: "",
        },
      }));
    } else if (action === "add") {
      setCategoryActions(categoryActions => ({
        ...categoryActions,
        add: {
          show: false,
          value: "",
        },
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
        <Input
          id="search"
          suffix={<Search />}
          className="my-2"
          onChange={handleCategoryActionValueChange}
        />
      )}

      {categoryActions.add.show && (
        <Input
          id="add"
          className="my-2"
          value={categoryActions.add.value}
          onChange={handleCategoryActionValueChange}
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